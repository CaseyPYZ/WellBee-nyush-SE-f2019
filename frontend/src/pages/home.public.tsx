import React, { Component } from "react";
import { Div } from "../styles/pages.style";

export default class HomePublic extends Component<any, any> {
    render() {
        return (
            <Div>
                <h1>Welcome to WellBee</h1>

                <h1>STATUS: {this.props.loggedInStatus}</h1>
            </Div>
        );
    }
}

