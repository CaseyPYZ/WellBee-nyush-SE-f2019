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
                <div>{this.state.authorizeList.map(this.getAuthorizeList)}</div>
            </Div>
        );
    }
}