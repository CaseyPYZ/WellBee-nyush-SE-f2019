import React, { Component } from "react";
import { Div } from "../../styles/pages.style";

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

    getAccessList(access: any, i: any) {
        return (
            <button className="btn btn-secondary btn-lg" onClick={() => { this.userRecords(access) }}>
                {access.email}
            </button>
        )
    }

    getRecord(record: any, i: any) {
        return (
            <button className="btn btn-secondary btn-lg" onClick={() => { this.individualRecord(record) }}>
                <p>Type: {record.type}</p>
                <p>Date:  {record.date}</p>
                <p>Record ID: {record.recordID}</p>
                <p>Description:  {record.description}</p>
            </button>
        )
    }

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

    getEntries(entries: any, i: any) {
        if ((entries.param === undefined) && (entries.value === null) && (entries.unit === "")) {
            return (<></>)
        } else {
            return (
                <div key={i} className="jumbotron">
                    <h2>Param: {entries.param}</h2>
                    <h2>Value: {entries.value}</h2>
                    <h2>Unit: {entries.unit}</h2>
                </div>
            )
        }
    }

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
                    <h1>Authorized</h1>
                    <br />
                    <div>{this.state.accessList.map(this.getAccessList)}</div>
                    <div>{this.state.userRecord.map(this.getRecord)}</div>
                </Div>
            );
        }
    }
}