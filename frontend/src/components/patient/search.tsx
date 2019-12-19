import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import { FaSearch } from "react-icons/fa";
import * as textStyle from "../../styles/text.style"

/*
Class: Search
- Search user email
*/
export default class Search extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            search: {},
            targetUserEmail: "",
            targetUsertype: "",
            keyword: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.grantAuthorization = this.grantAuthorization.bind(this);
    }

    // watches for any input
    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // POST username / email to server
    // Based on the email and usertype sent back to server,
    // if user exists in database, the user will be saved in the state 
    async handleSubmit(event: any) {
        event.preventDefault();
        await this.setState({
            targetUserEmail: this.state.keyword
        })
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });
        if (this.state.targetUsertype === 'user') {
            fetch("http://localhost:5000/searchUser", {
                method: "post",
                headers: headers,
                credentials: "include",
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    this.setState({ search: response })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errors: error });
                })
        } else if (this.state.targetUsertype === 'doctor') {
            fetch("http://localhost:5000/searchDoctor", {
                method: "post",
                headers: headers,
                credentials: "include",
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    this.setState({ search: response })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errors: error });
                })
        }
    }

    // POST username / email to server
    // Grants authorization for specified user to access their records
    // Specified user is saved into database
    async grantAuthorization(event: any) {
        event.preventDefault();
        await this.setState({
            targetUserEmail: this.state.keyword
        })
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });
        fetch("http://localhost:5000/authorize-user", {
            method: "post",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ search: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    // render authorization component
    render() {
        return (
            <Div>
                <h1 style={textStyle.pHeader} >Authorization</h1>
                <br />
                <form className="input-group md-form form-sm form-1 pl-0" onSubmit={this.handleSubmit}>
                    <input
                        className="form-control my-0 py-1"
                        name="keyword"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                    />

                    <select defaultValue={this.state.targetUsertype}
                        onChange={(e) => this.setState({ targetUsertype: e.target.value })}>
                        <option value="doctor" style={textStyle.pText} >Doctor</option>
                        <option value="user" style={textStyle.pText}>User</option>
                    </select>

                    <div className="input-group-prepend">
                        <button className="input-group-text cyan lighten-2" id="basic-text1"><FaSearch /></button>
                    </div>
                </form>

                <br />
                {this.state.search.email ?
                    <div className="jumbotron">
                        <h2>{this.state.search.email}</h2>
                        <br />
                        <button className="btn btn-primary btn-sm" onClick={this.grantAuthorization}>Grant</button>
                    </div>
                    :
                   <></>
                }
            </Div>
        );
    }
}