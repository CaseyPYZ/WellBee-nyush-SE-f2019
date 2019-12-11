import React, { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import { Div } from "../../styles/pages.style";

export default class AccessList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            accessList: [{ 1: 2 }, { 3: 4 }, { 5: 6 }]
        };

        this.getAccessList = this.getAccessList.bind(this);
    }

    componentDidMount() {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000'
        });

        console.log("IN HERE")
        fetch("http://localhost:5000/account/accessList", {
            method: "post",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ accessList: response.accessList })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    getAccessList(record: any, i: any) {
        return (
            <div className="jumbotron">
                <img alt=""></img>
                {i}
            </div>
        )
    }

    render() {
        return (
            <Div>
                <h1>Access</h1>
                <div className="input-group md-form form-sm form-1 pl-0">
                    <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
                    <div className="input-group-prepend">
                        <span className="input-group-text cyan lighten-2" id="basic-text1"><FaSearch /></span>
                    </div>
                </div>
                <br />
                <div>{this.state.accessList.map(this.getAccessList)}</div>
            </Div>
        );
    }
}