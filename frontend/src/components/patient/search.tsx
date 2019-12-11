import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import { FaSearch } from "react-icons/fa";

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

    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

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
    }

    // usertype / email
    async grantAuthorization(event: any) {
        event.preventDefault();

        await this.setState({
            targetUsertype: this.props.usertype,
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

    render() {
        return (
            <Div>
                <h1>Authorization</h1>
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
                    <div className="input-group-prepend">
                        <button className="input-group-text cyan lighten-2" id="basic-text1"><FaSearch /></button>
                    </div>
                </form>

                <div></div>
                {this.state.search ?
                    <div className="jumbotron">
                        {this.state.search.email}
                        <br />
                        <button className="btn btn-primary btn-sm" onClick={this.grantAuthorization}>Grant</button>
                    </div>
                    :
                    <div className="jumbotron">
                        {this.state.search.email}
                        <br />
                        <button className="btn btn-primary btn-sm" onClick={this.grantAuthorization}>Grant</button>
                    </div>
                }
            </Div>
        );
    }
}