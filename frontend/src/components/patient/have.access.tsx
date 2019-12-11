import React, { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import { Div } from "../../styles/pages.style";

export default class AccessList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            accessList: [],
            usertype: "",
            user: {}
        };

        this.getAccessList = this.getAccessList.bind(this);
    }

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
                console.log(response);
                this.setState({ accessList: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    getAccessList(access: any, i: any) {
        return (
            <div className="jumbotron">
                {access.email}
            </div>
        )
    }

    render() {
        return (
            <Div>
                <h1>Authorized</h1>
                
                <div>{this.state.accessList.map(this.getAccessList)}</div>
            </Div>
        );
    }
}