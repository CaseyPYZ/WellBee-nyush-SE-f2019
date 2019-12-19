import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Div } from "../../../styles/pages.style";
import * as textStyle from "../../../styles/text.style"
import * as elementStyle from "../../../styles/element.style"


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

  async getSingleRecord(i: any) {

    await this.setState({ recordID: this.state.recordList[i].recordID })
    console.log(this.state.recordList[i].recordID)
    console.log(this.state.recordID)

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

    console.log(this.state.record)
    this.setState({ single: true })
  }

  getRecordList(record: any, i: any) {
    return (
      <button style={elementStyle.listRow} key={i} onClick={() => this.getSingleRecord(i)}>
          <p style={textStyle.pText}>Record ID: {record.recordID}</p>
          <p style={textStyle.pText}>Description: {record.description}</p>
          <p style={textStyle.pText}>Timestamp: {record.date}</p>
      </button>
    )
  }

  getEntries(entries: any, i: any) {
    if ((entries.param === undefined) && (entries.value === null) && (entries.unit === "")) {
      return (<></>)
    } else {
      return (
        <div key={i} className="jumbotron">
          <h2>Param: {entries.param}</h2>
          <h2>Value: {entries.value}</h2>
          <h2>Unit: {entries.unit}</h2>
        </div>
      )
    }
  }

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