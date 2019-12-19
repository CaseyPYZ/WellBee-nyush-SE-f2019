import React, { Component } from "react";
import { Div } from "../styles/pages.style";

/*
Home page for ADMIN
*/
export default class AdminPrivate extends Component<any, any> {
    render() {
        return (
            <Div>
                <div>
                    <h3>ADMIN</h3>
                    <h2>WELCOME {this.props.user.email} </h2>
                </div>
            </Div>
        );
    }
}

