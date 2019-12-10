import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import Entry from "./entry";

export default class AddRecord extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            date: "",
            description: "",
            entries: [{ param: "", value: "", unit: "" }],
            errors: "",
            type: "",
            user: {}
        };

        this.addRecord = this.addRecord.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEntry = this.addEntry.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addEntry(key: any, param: any, value: any, unit: any) {
        this.setState({
            entries: [...this.state.entries, { key, param, value, unit }],
        })
    }

    async addRecord(event: any) {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }

        await fetch("http://localhost:5000/account/add-record", {
            method: "post",
            headers: headers,
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.props.history.push(`/patient/record`);
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
    }

    async editRecord(event: any) {
        // event.preventDefault();

        // const headers = {
        //     "Content-Type": "application/json",
        //     Accept: "application/json"
        // }

        // await fetch("http://localhost:5000/account/updaterecord", {
        //     method: "post",
        //     headers: headers,
        //     body: JSON.stringify(this.state)
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response);
        //         this.props.history.push(`/patient/record`);
        //     })
        //     .catch(error => {
        //         this.setState({ loginErrors: error });
        //     })
    }

    render() {
        return (
            <Div>
                {this.props.loggedInStatus}
                <h1>ADD RECORD</h1>
                <form onSubmit={this.addRecord}>
                    <div className="form-group">
                        <div><input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={this.state.date}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        /></div>
                        <div><input
                            type="type"
                            name="type"
                            placeholder="Record Type"
                            value={this.state.type}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        /></div>
                        <br />
                        <div><textarea
                            rows={10}
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        /></div>
                        <br />

                        <h2>Add entry to save values</h2>
                        {this.state.entries.map((subform: any, index: any) =>
                            <>
                                <Entry key={index} entryId={index} {...subform} submit={this.state.submit} addEntry={this.addEntry} />
                            </>
                        )}

                        <button type="submit" className="form-control">Add Record</button>
                    </div>
                </form>
            </Div >
        );
    }
}