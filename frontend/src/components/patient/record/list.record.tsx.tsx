import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Div } from "../../../styles/pages.style";

export default class RecordList extends Component<any, any> {
  _isMounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      recordList: [],
      errors: [],
      recordID: "",
      record: {}
    };

    this.getRecordList = this.getRecordList.bind(this);
    this.getSingleRecord = this.getSingleRecord.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

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

  async getSingleRecord(i:any) {

    await this.setState({recordID: this.state.recordList[i].recordID})
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
  }

  getRecordList(record: any, i: any) {
    return (
      <button key={i} className="jumbotron" onClick={() => this.getSingleRecord(i)}>
        <h2>{record.recordID}</h2>
        <h2>{record.description}</h2>
        <h2>{record.date}</h2>
      </button>
    )
  }

  render() {
    return (
      <Div>
        <h1>Personal Records</h1>
        <button type="button" className="btn btn-dark"><Link to="/user/addrecord"> Add Record </Link></button>
        <div>{this.state.recordList.map(this.getRecordList)}</div>
      </Div>
    );
  }
}