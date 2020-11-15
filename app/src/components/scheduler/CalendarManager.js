import React, { Component } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import Button from "react-bootstrap/Button";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calendar.css";
import CuisineSelector from "./CuisineSelector";
import LocationSelector from "./LocationSelector";

class CalendarDisplay extends Component {
  constructor(props) {
    super(props);

    // current state of stuff
    this.state = {
      date: new Date(),
      time: "17:00",
      apiDate: "",
      location: "central",
      selectedCuisine: [],
      bookedDates: [],
    };
    this.updateLocation = this.updateLocation.bind(this);
    this.updateCuisine = this.updateCuisine.bind(this);
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

  updateLocation(selection) {
    this.setState({ location: selection });
  }

  updateCuisine = (selections) => {
    this.setState({ selectedCuisine: selections });
  };

  compositeFunction = (payload, type) => {
    var parent_response = false;
    // Trigger date change and make API call to check if there is conflict in Scheduler.js
    if (type === "time") {
      this.setState({ time: payload }, () => {
        parent_response = this.props.checkReservations(
          this.state.time,
          this.format_date_api(this.state.date)
        );
      });
    } else {
      this.setState({ date: payload }, () => {
        parent_response = this.props.checkReservations(
          this.state.time,
          this.format_date_api(this.state.date)
        );
      });
    }
  };

  render() {
    const double_booking_messages = [
      "😏 someone's feeling naughty eh..? Don't you already have a date booked?",
      "🧐 Are you forgetting that you have another date already?",
      "Would you like to be on 🎅🏻's naughty list? If you book this date, it seems like the case!",
    ];
    const double_book_message =
      double_booking_messages[Math.floor(Math.random() * 2)];
    return (
      <div className={"calendar_whole"}>
        <div className={"calendar_title"}> BOOK YOUR DATE! </div>

        <div className={"calendar"}>
          <Calendar
            className={"calendar_design"}
            onChange={(date) => this.compositeFunction(date, "date")}
            value={this.state.date}
            minDate={new Date()}
          />
        </div>
        {this.props.conflicting_booking === "true" ? (
          <div>{double_book_message}</div>
        ) : (
          <div></div>
        )}
        <div className={"booking_details"}>
          <div className={"booking_header"}>ENTER BOOKING DETAILS</div>

          {/*  Used a table here in order to align the words date and time to make it more organized */}
          <table className={"details_table"}>
            <tr>
              <td>
                <h5>Date:</h5>
              </td>
              <td>
                <h5>{this.format_date_display()}</h5>
              </td>
            </tr>

            <tr>
              <td>
                <h5>Time:</h5>
              </td>
              <td>
                <h5>
                  <TimePicker
                    clockIcon={null}
                    clearIcon={null}
                    disableClock={true}
                    onChange={(time) => this.compositeFunction(time, "time")}
                    value={this.state.time}
                  />
                </h5>
              </td>
            </tr>

            <tr>
              <td>
                <h5>Location:</h5>
              </td>

              <td>
                <LocationSelector updateLocation={this.updateLocation} />
              </td>
            </tr>

            <tr>
              <td>
                <h5>Cuisine(s):</h5>
              </td>

              <td>
                <CuisineSelector updateCuisine={this.updateCuisine} />
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
                this.props.updateCuisine(this.state.selectedCuisine);
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
// }

export default CalendarDisplay;
