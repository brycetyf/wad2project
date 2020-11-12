import React, { Component } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import Button from "react-bootstrap/Button";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calendar.css";
import { Link } from "react-router-dom";
import List from "./list";
import Select from 'react-select';
import axios from 'axios';

class CalendarDisplay extends Component {
  constructor(props) {
    super(props);

    // current state of stuff
    this.state = {
      date: new Date(),
      time: "17:00",
      apiDate: "",
      location: "central",
      cuisine: [
        { value: 'japanese', label: 'Japanese' },
        { value: 'indian', label: 'Indian' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'malay', label:'Malay'},
        { value: 'western', label:'Western'},
      ],
      selectedOptions: [],
      bookedDates: [],
    };

    this.handleChange = this.handleChange.bind(this);

  }

  //Quandoo API requires this format of date in order to retrieve date
  format_date_api() {
    let date = this.state.date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let changed_date = year + "-" + month + "-" + dt;

    return changed_date;
  }

  //Date that we want to display to users
  format_date_display() {
    let date = this.state.date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let return_str = "";

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return dt + "-" + month + "-" + year;
  }

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  handleChange2 = (selectedOptions) => {
    this.setState({ selectedOptions });
  }

  updateBookedDates (dates) {
    this.setState({ bookedDates: dates });
    console.log(dates);
    console.log(this.state.bookedDates);
  }


  //If there is a booking existing in the same date, this function will be activated

  //Having some difficulty here trying to update the state array. Help look into it plz
  checkReservations(date) {

    var dates = [];    

    axios.get("http://127.0.0.1:5001/get_reservations").then((res) => {
      res.data.reservation_data
      .map((event) => {
        console.log(event.booking_date);

        dates.push(event.booking_date);
      })
      console.log(dates);
      this.updateBookedDates(dates);
    })
  }

  render() {
    if (this.state.bookedDates.includes(this.state.date)) {
      return (
        <div>
          <h1>YES WE DID IT</h1>
        </div>
      );
    }
    else {

      return (
        // add styling here

        <div className={"calendar_whole"}>
  
  
          <div className={"calendar_title"}> BOOK YOUR DATE! </div>
  
          <div className={"calendar"}>
            <Calendar
              className={"calendar_design"}
              onChange={(date) => this.setState({ date })}
              value={this.state.date}
              minDate={new Date()}
            />
          </div>
  
          <div className={"booking_details"}>
            <div className={"booking_header"}>ENTER BOOKING DETAILS</div>
  
            {/*  Used a table here in order to align the words date and time to make it more organized */}
            <table className={"details_table"}>
              <tr>
                <td>
                  <h5>Date:</h5>
                </td>
                <td><h5>{this.format_date_display()}</h5></td>
              </tr>
  
              <tr>
                <td>
                  <h5>Time:</h5>
                </td>
                <td><h5><TimePicker
                    clockIcon={null}
                    clearIcon={null}
                    disableClock={true}
                    onChange={(time) => this.setState({ time })}
                    value={this.state.time}
                  /></h5>
                </td>
              </tr>
  
              <tr>
                <td>
                  <h5>Location:</h5>
                </td>
  
                <td>
                    <h5><select value={this.state.value} onChange={this.handleChange}>
                    <option value="central">Central</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select></h5>
                </td>
              </tr>
  
              <tr>
                <td>
                  <h5>Cuisine:</h5>
                </td>
  
                <td><h5>
                <Select 
                    isMulti
                    name="cuisine"
                    options={this.state.cuisine}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.handleChange2}
                    />
                </h5>
                </td>
  
  
              </tr>
            </table>
  
            <div className={"button_div"}>
              <Button
                onClick={() => {
                  this.props.updateAPIDate(this.format_date_api());
                  this.props.updateCounter();
                  this.props.updateTime(this.state.time);
                  this.props.updateLocation(this.state.location);
                  this.props.updateCuisine(this.state.selectedOptions);
                  this.checkReservations(this.format_date_api());
                }}
                variant="success"
                size="md"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      );      
    }
  }
}

export default CalendarDisplay;
