import React, { Component } from "react";

export default class Entry extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            param: "",
            value: "",
            unit: "",
            submit: "EMPTY"
        };
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleEntryChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit() {
        this.setState({ submit: "SUBMITTED" })
        console.log(this.state)
        this.props.addEntry(this.props.entryId, this.state.param, this.state.value, this.state.unit)
    }


    render() {
        if (this.state.submit === "SUBMITTED") {
            return (
                <h3>Parameter: {this.state.param} | Value: {this.state.value} | Unit: {this.state.unit}</h3>
            )
        } else if (this.state.submit === "EMPTY") {
            return (
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="param"
                        placeholder="Parameter"
                        value={this.state.param}
                        onChange={this.handleEntryChange}
                    />
                    <input
                        type="text"
                        name="value"
                        placeholder="Value"
                        value={this.state.value}
                        onChange={this.handleEntryChange}
                    />
                    <input
                        type="text"
                        name="unit"
                        placeholder="Unit"
                        value={this.state.unit}
                        onChange={this.handleEntryChange}
                    />
                    <button type="submit">Add entry</button>
                </form>
            )
        }
    }
}
