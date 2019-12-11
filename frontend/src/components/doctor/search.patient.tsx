import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import { FaSearch } from "react-icons/fa";

export default class SearchPatient extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            keyword: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPatient = this.searchPatient.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    searchPatient(event:any) {
        event.preventDefault();

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

        console.log(this.state.keyword)

        fetch("http://localhost:5000/searchUser", {
            method: "post",
            credentials: "include",
            headers: headers,
        })
            .then(response => response.text())
            .then(response => {
                console.log(response);
                // this.setState({ user: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    render() {
        return (
            <Div>
                <h1>Search Patient</h1>
                <form className="input-group md-form form-sm form-1 pl-0" onSubmit={this.searchPatient}>
                    <input
                        className="form-control my-0 py-1"
                        name="keyword"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                    />
                    <div className="input-group-prepend">
                        <button className="input-group-text cyan lighten-2" id="basic-text1"><FaSearch /></button>
                    </div>
                </form>
            </Div>
        );
    }
}