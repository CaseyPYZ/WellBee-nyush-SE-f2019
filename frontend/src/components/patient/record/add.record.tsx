import React, { Component } from "react";
import { Div } from "../../../styles/pages.style";

//https://codesandbox.io/s/00xq32n3pn?from-embed

export default class AddRecord extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            date: "",
            description: "",
            entries: [
                { param: "", value: "", unit: "" },
                { param: "", value: "", unit: "" },
                { param: "", value: "", unit: "" },
                { param: "", value: "", unit: "" },
                { param: "", value: "", unit: "" }
            ],
            errors: "",
            type: "",
        };

        this.addRecord = this.addRecord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);
        this.handleRemoveEntry = this.handleRemoveEntry.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleEntryChange = (idx: any) => (event: any) => {
        const newEntry = this.state.entries.map((entry: any, index: any) => {
            if (idx !== index) return entry;
            return { ...entry, [event.target.name]: event.target.value };
        });
        this.setState({ entries: newEntry });
    };

    handleAddEntry = () => {
        this.setState({
            entries: this.state.entries.concat([{ param: "", value: "", unit: "" }])
        });
    };

    handleRemoveEntry = (idx: any) => () => {
        this.setState({
            entries: this.state.entries.filter((s: any, sidx: any) => idx !== sidx)
        });
    };

    async addRecord(event: any) {
        event.preventDefault();

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:5000/'
        });

        console.log("IN HERE")
        fetch("http://localhost:5000/account/add-record", {
            method: "post",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                console.log(this.props.history)
                this.props.history.push(`/patient/record`);
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error });
            })
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

                        {this.state.entries.map((entry: any, idx: any) => (
                            <div >
                                <input
                                    type="text"
                                    name="param"
                                    placeholder="Parameter"
                                    value={this.state.param}
                                    className="form-check-inline"
                                    onChange={this.handleEntryChange(idx)}
                                />
                                <input
                                    type="text"
                                    name="value"
                                    placeholder="Value"
                                    value={this.state.value}
                                    className="form-check-inline"
                                    onChange={this.handleEntryChange(idx)}
                                />
                                <input
                                    type="text"
                                    name="unit"
                                    placeholder="Unit"
                                    value={this.state.unit}
                                    className="form-check-inline"
                                    onChange={this.handleEntryChange(idx)}
                                />
                                <button
                                    type="button"
                                    onClick={this.handleRemoveEntry(idx)}
                                    className="small"
                                > - </button>
                                <br />
                            </div>
                        ))}
                        <button type="button" onClick={this.handleAddEntry} className="small">
                            Add Entry
                        </button>
                        <div></div>
                        <button type="submit" className="form-control">Add Record</button>
                    </div>
                </form>
            </Div >
        );
    }
}