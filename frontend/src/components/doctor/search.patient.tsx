import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import { FaSearch } from "react-icons/fa";
import * as textStyle from "../../styles/text.style";

/*
Class: Search Patient
- doctor searched for patient
*/
export default class SearchPatient extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            keyword: "",
            user: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPatient = this.searchPatient.bind(this);
    }

    // handles input in the search bar
    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // search patient on backend based on exact patient email
    searchPatient(event:any) {
        event.preventDefault();
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });
        fetch("http://localhost:5000/searchUser", {
            method: "post",
            credentials: "include",
            headers: headers,
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ user: response })
            })
            .catch(error => {
                this.setState({ errors: error });
            })
    }

    // search bar
    render() {
        return (
            <Div>
                <h1 style={textStyle.pHeader}>Search Patient</h1>
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
                <button>{this.state.user.email}</button>
            </Div>
        );
    }
}