import React, { Component } from "react";
import { Div } from "../styles/pages.style";

/*
Once logged in as an ADMIN
*/
export default class AdminPrivate extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            profile: false,
            doctor: false,
            patient: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        this.props.handleLogout();
    }

    render() {
        return (
            <Div>
                <h1>STATUS: {this.props.loggedInStatus}</h1>
                <div>
                    <h3>HI ADMIN</h3>
                </div>
            </Div>
        );
    }
}

