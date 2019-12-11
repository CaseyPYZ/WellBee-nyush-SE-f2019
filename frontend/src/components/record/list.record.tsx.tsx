import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Div } from "../../styles/pages.style";

export default class RecordList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      recordList: [],
      errors: []
    };

    this.getRecordList = this.getRecordList.bind(this);
  }

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });

    console.log("IN HERE")
    fetch("http://localhost:5000/account/get-recordlist", {
      method: "post",
      headers: headers,
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ recordList: response })
      })
      .catch(error => {
        console.log(error);
        this.setState({ errors: error });
      })
  }

  getSingleRecord() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });

    console.log("IN HERE")
    fetch("http://localhost:5000/account/get-recordlist", {
      method: "post",
      headers: headers,
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ recordList: response })
      })
      .catch(error => {
        console.log(error);
        this.setState({ errors: error });
      })
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