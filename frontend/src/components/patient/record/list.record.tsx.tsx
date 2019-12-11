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
      recordID: ""
    };

    this.getRecordList = this.getRecordList.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    console.log("IN HERE")
    fetch("http://localhost:5000/account/get-recordlist", {
      method: "get",
      credentials: "include",
      mode: 'cors',
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

  getSingleRecord() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });

    fetch("http://localhost:5000/account/get-record", {
      method: "post",
      credentials: "include",
      headers: headers,
      mode: 'cors',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        // this.setState({ recordList: response })
      })
      .catch(error => {
        console.log(error);
        // this.setState({ errors: error });
      })
  }

  getRecordList(record: any, i: any) {
    return (
      <button key={i} className="jumbotron" onClick={this.getSingleRecord}>
        <h2>{record.recordID}</h2>
        <h2>{record.description}</h2>
        <h2>{record.date}</h2>
      </button>
    )
  }

  redirect() {

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