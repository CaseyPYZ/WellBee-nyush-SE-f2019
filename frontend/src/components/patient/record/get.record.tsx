import React, { Component } from "react";
import { Div } from "../../../styles/pages.style";

export default class GetRecord extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      record: {},
    };
  }

  render() {
    return (
      <Div>
        {this.state.record.date}
      </Div>
    );
  }
}