import React, { Component } from "react";

export default class Entry extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            key: 0,
            param: "",
            value: "",
            unit: ""
        };
        this.handleEntryChange = this.handleEntryChange.bind(this);
    }

    handleEntryChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submit() {
        if (this.props.submit) {
            this.props.addEntry(this.state)
        }
    }

    render() {
        return (
            <>
                <input
                    type="text"
                    name="param"
                    placeholder="Parameter"
                    value={this.state.param}
                    onChange={this.handleEntryChange}
                    className="form-control"
                />
                <input
                    type="text"
                    name="value"
                    placeholder="Value"
                    value={this.state.value}
                    onChange={this.handleEntryChange}
                    className="form-control"
                />
                <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    value={this.state.unit}
                    onChange={this.handleEntryChange}
                    className="form-control"
                />
                {this.props.submit ? (
                    this.submit()
                ) : (
                    this.props.submit
                )}
            </>
        )
    }
}