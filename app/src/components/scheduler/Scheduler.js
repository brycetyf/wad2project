import React, { Component } from "react";
import List from "./list";
import CalendarManager from "./CalendarManager";
import axios from "axios";

class Scheduler extends Component {
  state = {
    time: "17:00",
    location: "",
    apiDate: "",
    cuisine: [],
    counter: 0,
    conflicting_booking: false,
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

  update_cuisine = (new_cuisine) => {
    this.setState({ cuisine: new_cuisine });
  };

  checkReservations = (time, date) => {
    axios
      .get(
        `http://127.0.0.1:5001/check_reservation/booking_date=${date}&booking_time=${time}`
      )
      .then((res) => {
        this.setState(
          {
            conflicting_booking: res.data.conflicting_booking,
          },
          () => console.log(this.state.conflicting_booking)
        );
      });
  };

  componentDidMount = () => {
    console.log(this.props);
  };

  render() {
    if (this.state.counter === 0) {
      return (
        <div>
          <CalendarManager
            updateTime={this.update_time}
            updateLocation={this.update_location}
            updateCounter={this.update_counter}
            updateAPIDate={this.update_api_date}
            updateCuisine={this.update_cuisine}
            date={this.state.date}
            apiDate={this.state.apiDate}
            time={this.state.time}
            location={this.state.location}
            cuisine={this.state.cuisine}
            checkReservations={this.checkReservations}
            conflicting_booking={this.state.conflicting_booking}
          />
        </div>
      );
    } else if (this.state.counter === 1) {
      return (
        <div>
          <List
            apiDate={this.state.apiDate}
            time={this.state.time}
            location={this.state.location}
            cuisine={this.state.cuisine}
            person={this.props.person}
            person_url={this.props.person_url}
          />
        </div>
      );
    }
  }
}

export default Scheduler;
