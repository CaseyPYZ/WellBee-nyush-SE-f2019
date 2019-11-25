import React, { Component } from "react";

export default class AddRecord extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            date: "",
            time: "",
            description: ""
        };

        this.addRecord = this.addRecord.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        console.log("HERE");
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async addRecord(event: any) {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }

        await fetch("http://localhost:5000/addRecord", {
            method: "post",
            headers: headers,
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.props.history.push(`/record`);
            })
            .catch(error => {
                this.setState({ loginErrors: error });
            })
    }

    async editRecord(event: any) {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }

        await fetch("http://localhost:5000/editRecord", {
            method: "post",
            headers: headers,
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.props.history.push(`/record`);
            })
            .catch(error => {
                this.setState({ loginErrors: error });
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addRecord}>
                    <div className="form-group">
                        <input
                            type="name"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
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
                            type="time"
                            name="time"
                            placeholder="Time"
                            value={this.state.time}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        /></div>
                        <div><input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        /></div>
                        <button type="submit" className="form-control">Add Record</button>
                    </div>
                </form>
            </div>
        );
    }
}