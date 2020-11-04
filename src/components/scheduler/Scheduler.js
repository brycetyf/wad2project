import React, { Component } from "react";
import List from "./list";
import CalendarDisplay from "./CalendarDisplay";

class Scheduler extends Component {
  state = {
    time: "1700",
  };

  // callback functions
  update_time = (some_value) => {
    this.setState({ time: "2000" });
  };

  render() {
    return (<div>
        <List abc={this.update_time}/>
    </div>);
  }
}

export default Scheduler;
