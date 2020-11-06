import React, { Component } from "react";
import List from "./list";
import CalendarDisplay from "./CalendarDisplay";

class Scheduler extends Component {
  state = {
    time: "17:00",
    location: "",
    apiDate: "",
    counter: 0,
  };

  // callback functions
  update_time = (newtime) => {
    this.setState({ time: newtime });
  };

  update_location = (newlocation) => {
    this.setState({ location: newlocation });
  };

  update_counter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  update_api_date = (new_api_date) => {
    this.setState({ apiDate: new_api_date });
  };

  componentDidMount = () => {
    console.log(this.props);
  };
  render() {
    if (this.state.counter === 0) {
      return (
        <div>
          <CalendarDisplay
            updateTime={this.update_time}
            updateLocation={this.update_location}
            updateCounter={this.update_counter}
            updateAPIDate={this.update_api_date}
            date={this.state.date}
            apiDate={this.state.apiDate}
            time={this.state.time}
            location={this.state.location}
          />
        </div>
      );
    } else if (this.state.counter === 1) {
      return (
        <div>
          <List
            updateTime={this.update_time}
            updateLocation={this.update_location}
            updateCounter={this.update_counter}
            updateAPIDate={this.update_api_date}
            apiDate={this.state.apiDate}
            time={this.state.time}
            location={this.state.location}
            person={this.props.person}
            person_url={this.props.person_url}
          />
        </div>
      );
    }
  }
}

export default Scheduler;
