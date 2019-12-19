import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Div } from "../../../styles/pages.style";
import * as textStyle from "../../../styles/text.style"
import * as elementStyle from "../../../styles/element.style"


/*
Class: RecordList
- All the records of the patient
*/
export default class RecordList extends Component<any, any> {
  _isMounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      recordList: [],
      errors: [],
      recordID: "",
      record: { entries: [] },
      single: false
    };

    this.getRecordList = this.getRecordList.bind(this);
    this.getSingleRecord = this.getSingleRecord.bind(this);
    this.getEntries = this.getEntries.bind(this);
    this.singlePage = this.singlePage.bind(this);
  }

  // patient get all their records
  componentDidMount() {
    this._isMounted = true;
    this.setState({ single: false })

    console.log("IN HERE")
    fetch("http://localhost:5000/account/get-recordlist", {
      method: "get",
      credentials: "include",
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ recordList: response })
      })
      .catch(error => {
        console.log(error);
        this.setState({ errors: error });
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // patient get one record with more detailed information
  async getSingleRecord(i: any) {
    await this.setState({ recordID: this.state.recordList[i].recordID })
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
        this.setState({ record: response })
      })
      .catch(error => {
        console.log(error);
        this.setState({ errors: error });
      })
    this.setState({ single: true })
  }

  // map out buttons for each record that was fetched from the backend
  getRecordList(record: any, i: any) {
    return (
      <button style={elementStyle.listRow} key={i} onClick={() => this.getSingleRecord(i)}>
          <p style={textStyle.pText}>Timestamp: {record.date}</p>
          <p style={textStyle.pText}>Description: {record.description}</p>
      </button>
    )
  }

  // map out all the entries
  // dont map them if they are empty
  getEntries(entries: any, i: any) {
    if ((entries.param === undefined) && (entries.value === null) && (entries.unit === "")) {
      return (<></>)
    } else {
      return (
        <div style={elementStyle.listRow} key={i} >
          <h2 style={textStyle.pText}>Param: {entries.param}</h2>
          <h2 style={textStyle.pText}>Value: {entries.value}</h2>
          <h2 style={textStyle.pText}>Unit: {entries.unit}</h2>
        </div>
      )
    }
  }

  // if single = true -> then render the individual record 
  // if false, render the record list 
  // this sets single to false
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
          <h1 style={textStyle.pHeader}>Personal Records</h1>
          <br /><br /><br />
          <button type="button" className="btn btn-secondary btn-space"><Link style={textStyle.buttonLinkText} to="/user/addrecord"> Add Record </Link></button>
          <br /><br /><br /><br /><br />
          <div>{this.state.recordList.map(this.getRecordList)}</div>
        </Div>
      );
    }
  }
}