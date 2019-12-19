import React, { Component } from "react";
import { Div } from "../../styles/pages.style";

/*
Class: Authorized
- list of patients the doctor as access to
*/
export default class Authorized extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            accessList: [],
            usertype: "",
            user: {},
            userRecord: [],
            targetUserEmail: ""
        };

        this.getAccessList = this.getAccessList.bind(this);
        this.userRecords = this.userRecords.bind(this);
    }

    // gets list of patients the specific doctor has from backend
    componentDidMount() {
        this.setState({
            usertype: this.props.usertype,
            user: this.props.user
        })
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000'
        });
        fetch("http://localhost:5000/view-authorized-users", {
            method: "post",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ accessList: response })
            })
            .catch(error => {
                this.setState({ errors: error });
            })
    }

    // map out all the patients as buttons
    getAccessList(access: any, i: any) {
        return (
            <button className="jumbotron" onClick = {() => {this.userRecords(access)}}>
                {access.email}
            </button>
        )
    }

    // when button of a patient clicked, get a list of all the records of that specific patient
    userRecords(access: any) {
        this.setState({
            targetUserEmail: access.email
        })
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000'
        });
        fetch("http://localhost:5000/view-user-records", {
            method: "post",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ userRecord: response })
            })
            .catch(error => {
                this.setState({ errors: error });
            })
    }

    // map out the access list and user record list
    render() {
        return (
            <Div>
                <h1>Authorized</h1>
                <div>{this.state.accessList.map(this.getAccessList)}</div>
                <div>{this.state.userRecord.map(this.getAccessList)}</div>

            </Div>
        );
    }
}