import React, { Component } from "react";

export default class HomePublic extends Component<any, any> {
    render() {
        return (
            <div>
                <h1>Welcome to WellBee</h1>

                <h1>STATUS: {this.props.loggedInStatus}</h1>
            </div>
        );
    }
}

