import React, { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import { Div } from "../styles/pages.style";

export default class PatientList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            patientList: [{ 1: 2 }, { 3: 4 }, { 5: 6 }]
        };

        this.getPatientList = this.getPatientList.bind(this);
    }

    getPatientList(patient: any, i: any) {
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
                <h1>Patient List</h1>
                <div className="input-group md-form form-sm form-1 pl-0">
                    <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
                    <div className="input-group-prepend">
                        <span className="input-group-text cyan lighten-2" id="basic-text1"><FaSearch /></span>
                    </div>
                </div>
                <br />
                <div>{this.state.patientList.map(this.getPatientList)}</div>
            </Div>
        );
    }
}