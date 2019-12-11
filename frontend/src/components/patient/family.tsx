import React, { Component } from "react";
import { Div } from "../../styles/pages.style";

export default class Family extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            familyList: [{ 1: 2 }, { 3: 4 }, { 5: 6 }]
        };

        this.getFamilyList = this.getFamilyList.bind(this);
    }

    getFamilyList(record: any, i: any) {
        return (
            <div className="jumbotron">
                <img alt=""></img>
                {i}
                <br />
                To make changes, please login to their account (?)
                <br />
                <button className="btn btn-primary btn-sm" >Login</button>
            </div>
        )
    }

    render() {
        return (
            <Div>
                <h1>Family Members</h1>
                <div>{this.state.familyList.map(this.getFamilyList)}</div>
            </Div>
        );
    }
}