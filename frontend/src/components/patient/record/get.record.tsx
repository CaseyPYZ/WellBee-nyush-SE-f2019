import React, { Component } from "react";
import { Div } from "../../../styles/pages.style";

export default class GetRecord extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      record: {}
    };
    this.getSingleRecord = this.getSingleRecord.bind(this);
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

  render() {
    return (
      <Div>
        {this.state.recordID}
      </Div>
    );
  }
}