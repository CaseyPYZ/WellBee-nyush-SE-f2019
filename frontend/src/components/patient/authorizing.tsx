import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import * as textStyle from "../../styles/text.style"

export default class AuthorizeList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            authorizeList: [],
            targetUsertype: "",
            targetUserEmail: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.getAuthorizingList = this.getAuthorizingList.bind(this);
        this.removeAuthorization = this.removeAuthorization.bind(this);
    }

    // watches for any input
    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

        fetch("http://localhost:5000/view-authorizing-users", {
            method: "get",
            headers: headers,
            credentials: "include",
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ authorizeList: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    async removeAuthorization(user:any) {
        console.log(user)
        await this.setState({
            targetUsertype: user.usertype,
            targetUserEmail: user.email
        }) 

        console.log(user.usertype)

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

        fetch("http://localhost:5000/remove-auth", {
            method: "post",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                // this.setState({ authorizeList: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    getAuthorizingList(record: any, i: any) {
        return (
            <div className="jumbotron">
                <h3>{record.email}</h3>
                <br />
                <button className="btn btn-secondary btn-sm" onClick={() => this.removeAuthorization(record)}> Remove </button>
            </div>
        )
    }


    render() {
        return (
            <Div>
                <h1 style={textStyle.pHeader} >Authorizing</h1>
                <h2 style={textStyle.pSubHeader}>Currently authorizing the following users</h2>
                <br />
                <div>{this.state.authorizeList.map(this.getAuthorizingList)}</div>
            </Div>
        );
    }
}