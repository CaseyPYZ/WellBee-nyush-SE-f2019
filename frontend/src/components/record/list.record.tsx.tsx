import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Div } from "../../styles/pages.style";

export default class RecordList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      recordList: [{ 1: 2 }, { 3: 4 }, { 5: 6 }]
    };

    this.getRecordList = this.getRecordList.bind(this);
  }

  getSingleRecord() {
    console.log("HI")
    // fetch individual record
  }

  getRecordList(record: any, i: any) {
    return (
      <details key={i} className="jumbotron" onClick={this.getSingleRecord}>
        <summary>{i}</summary>
        <p> RECORD INFORMATION ~ </p>
        <button type="button" className="btn btn-dark" onClick={this.editRecord}>Edit Record</button>
        <button type="button" className="btn btn-dark" onClick={this.deleteRecord}>Delete Record</button>
      </details>
    )
  }

  deleteRecord() {
    // talk to backend
  }

  editRecord() {
    // talk to backend
  }

  render() {
    return (
      <Div>
        <h1>Personal Records</h1>
        <button type="button" className="btn btn-dark"><Link to="/patient/addrecord"> Add Record </Link></button>
        <div>{this.state.recordList.map(this.getRecordList)}</div>
      </Div>
    );
  }
}