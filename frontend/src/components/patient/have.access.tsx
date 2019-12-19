import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import * as textStyle from "../../styles/text.style"


/*
Class: AccessList
- List of people whom you gave access to
*/
export default class AccessList extends Component<any, any> {
    _isMounted = false;

    constructor(props: any) {
        super(props);
        this.state = {
            accessList: [],
            usertype: "",
            user: {},
            userRecord: [],
            targetUserEmail: "",
            recordID: "",
            record: { entries: [] },
            single: false
        };

        this.getAccessList = this.getAccessList.bind(this);
        this.userRecords = this.userRecords.bind(this);
        this.getRecord = this.getRecord.bind(this);
        this.individualRecord = this.individualRecord.bind(this);
        this.singlePage = this.singlePage.bind(this);
        this.getEntries = this.getEntries.bind(this);
    }

    // when component rendered, get list of authorized users
    componentDidMount() {
        this._isMounted = true;

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

    componentWillUnmount() {
        this._isMounted = false;
    }

    // create buttons for each person you granted access
    // when button clicked, get list of records from the person you clicked
    getAccessList(access: any, i: any) {
        return (
            <button className="btn btn-secondary btn-lg" onClick={() => { this.userRecords(access) }}>
                {access.email}
            </button>
        )
    }

    // create button for all the records that are listed
    // brief information
    getRecord(record: any, i: any) {
        return (
            <button className="btn btn-secondary btn-lg" onClick={() => { this.individualRecord(record) }}>
                <p style={textStyle.pText} >Type: {record.type}</p>
                <p style={textStyle.pText} >Date:  {record.date}</p>
                <p style={textStyle.pText} >Record ID: {record.recordID}</p>
                <p style={textStyle.pText} >Description:  {record.description}</p>
            </button>
        )
    }

    // get detailed information of the specific record
    async individualRecord(record: any) {
        console.log("RECORD")
        await this.setState({ recordID: record.recordID })
        console.log(this.state.recordID)

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

        fetch("http://localhost:5000/account/get-record", {
            method: "post",
            credentials: "include",
            headers: headers,
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                console.log(response.entries)
                this.setState({ record: response })
            })
            .catch(error => {
                this.setState({ errors: error });
            })
        this.setState({ single: true })
    }

    // fetch a record list from the backend
    async userRecords(access: any) {
        this.setState({
            targetUserEmail: access.email
        })
        console.log(this.state)
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
                console.log(response);
                this.setState({ userRecord: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    // map out each entry from the specific record
    getEntries(entries: any, i: any) {
        if ((entries.param === undefined) && (entries.value === null) && (entries.unit === "")) {
            return (<></>)
        } else {
            return (
                <div key={i} className="jumbotron">
                    <h2 style={textStyle.pText} >Param: {entries.param}</h2>
                    <h2 style={textStyle.pText} >Value: {entries.value}</h2>
                    <h2 style={textStyle.pText} >Unit: {entries.unit}</h2>
                </div>
            )
        }
    }

    // if single = true -> then render the individual record 
    // if false, render the access list 
    // this sets single to false
    singlePage() {
        this.setState({ single: false })
    }

    render() {
        if (this.state.single) {
            return (
                <Div onClick={this.singlePage}>
                    <p>{this.state.record.type}</p>
                    <p>{this.state.record.date}</p>
                    <p>{this.state.record.entries.map(this.getEntries)}</p>
                </Div>
            )
        } else {
            return (
                <Div>
                    <h1 style={textStyle.pHeader} >Authorized</h1>
                    <br />
                    <div>{this.state.accessList.map(this.getAccessList)}</div>
                    <div>{this.state.userRecord.map(this.getRecord)}</div>
                </Div>
            );
        }
    }
}