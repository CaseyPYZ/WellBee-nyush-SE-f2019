import React, { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import { Div } from "../../styles/pages.style";

export default class PatientList extends Component<any, any> {
    _isMounted = false;

    constructor(props: any) {
        super(props);
        this.state = {
            patientList: [],
            key: "",
        };

        this.getPatientList = this.getPatientList.bind(this);
        this.searchPatient = this.searchPatient.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        fetch("http://localhost:5000/getAllUser", {
            method: "get",
            credentials: "include",
            mode: 'cors',
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ patientList: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getPatientList(patient: any, i: any) {
        return (
            <div key={i} className="jumbotron">
                <img alt=""></img>
                {i}
                <h2>{patient.email}</h2>
            </div>
        )
    }

    searchPatient(event: any) {
        event.preventDefault();

        fetch("http://localhost:5000/getAllUser", {
            method: "get",
            credentials: "include",
            mode: 'cors',
        })
            .then(response => response.json())
            .then(response => {
                var newList = response.filter((patient: any) => {
                    if (patient.email.includes(this.state.key)) {
                        return patient
                    }
                    return
                })
                if (newList.length === 0 || newList === undefined){
                    this.setState({ patientList: [] })
                } else {
                    this.setState({ patientList: newList })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    render() {
        return (
            <Div>
                <h1>Patient List</h1>
                <form className="input-group md-form form-sm form-1 pl-0" onSubmit={this.searchPatient}>
                    <input
                        className="form-control my-0 py-1"
                        name="key"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        value={this.state.key}
                        onChange={this.handleChange}
                    />
                    <div className="input-group-prepend">
                        <button className="input-group-text cyan lighten-2" id="basic-text1"><FaSearch /></button>
                    </div>
                </form>
                <br />
                <div>{this.state.patientList.map(this.getPatientList)}</div>
            </Div>
        );
    }
}