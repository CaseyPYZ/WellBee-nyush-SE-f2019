import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RecordList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      recordList: [{ 1: 2}, {3: 4}, {5: 6}]
    };

    this.getRecordList = this.getRecordList.bind(this);
  }

  getRecordList(record: any, i: any) {
    return (
      <div className="jumbotron">
        <img></img>
        {i}
      </div>
    )
  }

  deleteRecord() {

  }

  editRecord() {

  }

  render() {
    return (
      <>
        <h1>Personal Records</h1>
        <button><Link to="/record/add"> Add Record </Link></button>
        <div>{this.state.recordList.map(this.getRecordList)}</div>
      </>
    );
  }
}