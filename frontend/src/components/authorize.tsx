import React, { Component } from "react";
import { Div } from "../styles/pages.style";

export default class AuthorizeList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            authorizeList: [{ 1: 2 }, { 3: 4 }, { 5: 6 }]
        };

        this.getAuthorizeList = this.getAuthorizeList.bind(this);
    }

    componentDidMount() {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

        console.log("IN HERE")
        fetch("http://localhost:5000/account/authorizeList", {
            method: "post",
            headers: headers,
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ authorizeList: response.authorizeList })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    getAuthorizeList(record: any, i: any) {
        return (
            <div className="jumbotron">
                <img alt=""></img>
                {i}
                <br />
                <button className="btn btn-primary btn-sm">Agree</button>
                <button className="btn btn-primary btn-sm">Reject</button>
            </div>
        )
    }

    grantAuthorization() {

    }

    rejectAuthorization() {

    }

    render() {
        return (
            <Div>
                <h1>Authorization</h1>
                <br />
                <div>{this.state.authorizeList.map(this.getAuthorizeList)}</div>
            </Div>
        );
    }
}