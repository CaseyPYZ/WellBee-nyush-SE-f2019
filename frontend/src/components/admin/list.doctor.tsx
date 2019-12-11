import React, { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import { Div } from "../../styles/pages.style";

export default class DoctorList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            doctorList: [],
            key: "",
            errors: []
        };

        this.getDoctorList = this.getDoctorList.bind(this);
        this.searchDoctor = this.searchDoctor.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:5000/getAllDoctor", {
            method: "get",
            credentials: "include",
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ doctorList: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getDoctorList(doctor: any, i: any) {
        return (
            <div key={i} className="jumbotron">
                <img alt=""></img>
                {i}
                <h2>{doctor.email}</h2>
            </div>
        )
    }

    searchDoctor(event: any) {
        event.preventDefault();

        fetch("http://localhost:5000/getAllDoctor", {
            method: "get",
            credentials: "include",
        })
            .then(response => response.json())
            .then(response => {
                var newList = response.filter((doctor: any) => {
                    if (doctor.email.includes(this.state.key)) {
                        return doctor
                    }
                    return
                })
                if (newList.length === 0 || newList === undefined){
                    this.setState({ doctorList: [] })
                } else {
                    this.setState({ doctorList: newList })
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
                <h1>Doctor List</h1>
                <form className="input-group md-form form-sm form-1 pl-0" onSubmit={this.searchDoctor}>
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
                <div>{this.state.doctorList.map(this.getDoctorList)}</div>
            </Div>
        );
    }
}