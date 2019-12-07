import React, { Component } from "react";
import { Div } from "../../styles/pages.style";
import Entry from "./entry";

export default class AddRecord extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            date: "",
            description: "",
            entries: [{ param: "", value: "", unit: "" },
            { param: "", value: "", unit: "" },
            { param: "", value: "", unit: "" },
            { param: "", value: "", unit: "" }],
            errors: "",
            entryNum: 1,
            submit: false,
            entryObj: []
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

    addEntry(entry:any) {
        console.log(this.state.entries)
        console.log(entry.target.param, entry.target.value, entry.target.unit)
        console.log(entry.param, entry.value, entry.unit)
        this.setState({
            entries: [...this.state.entries, {param: entry.paran, value:entry.value, unit:entry.unit}],
            entryObj: [...this.state.entryObj,  <Entry key={this.state.entryNum} addEntry={this.addEntry} submit={this.state.submit} />],
            submit: false,
            entryNum: this.state.entryNum + 1
        })
    }

    async addRecord(event: any) {
        event.preventDefault();

        await this.setState({ submit: true });

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }

        console.log(this.state)

        await fetch("http://localhost:5000//account/addrecord", {
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
                this.setState({ errors: error });
                console.log(error);
            })
    }

    async editRecord(event: any) {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }

        await fetch("http://localhost:5000/account/updaterecord", {
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
                this.setState({ loginErrors: error });
            })
    }

    render() {
        return (
            <Div>
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

                        < button type="button" onClick={this.addEntry} > +++ </button>
                        {this.state.entries.map((subform:any , index:any) =>
                            <>
                                <Entry {...subform} />
                            </>
                        )}

                        <button type="submit" className="form-control">Add Record</button>
                    </div>
                </form>
            </Div >
        );
    }
}