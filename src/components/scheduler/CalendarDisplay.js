import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import Button from 'react-bootstrap/Button'
import 'react-calendar/dist/Calendar.css';
import '../../styles/Calendar.css';
import { Link } from "react-router-dom";
import List from "./List";

class CalendarDisplay extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      date: new Date(),
      time: '17:00',
      location: {
        Central: [1.2865,103.8412],
        North: [1.4304,103.8354],
        South: [1.2655,103.8239],
        East: [1.3236,103,9273],
        West: [1.3329,103.7670],
      },
    }
  }

  //Quandoo API requires this format of date in order to retrieve date
  format_date_api() {
    let date = this.state.date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate()

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year+'-' + month + '-'+ dt
  }

  //Date that we want to display to users
  format_date_display() {
    let date = this.state.date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate()

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return dt+'-' + month + '-'+ year    
  }

  render() {
    const time = '1600';
    return (
        // add styling here 
      <div className={"calendar_whole"}>
          <div className={"calendar_title"}> BOOK YOUR DATE! </div>

          <div className={"calendar"}>
            <Calendar className={"calendar_design"}
            onChange={date => this.setState({ date })}
            value={this.state.date}
            />
          </div>

        <div className={"booking_details"}>
          <h4>Enter Booking Details</h4>

          {/*  Used a table here in order to align the words date and time to make it more organized */}
          <table className={"details_table"}>
            <tr>
              <td>
                <b>Date: </b>
              </td>
              <td>
                {this.format_date_display()}
              </td>
            </tr>

            <tr>
              <td>
                <b>Time: </b> 
              </td>
              <td>
                <TimePicker
                clockIcon = {null}
                clearIcon = {null}
                disableClock = {true}
                onChange={time => this.setState({ time })}
                value={this.state.time}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>Location: </b>
              </td>
              
              <td>
                <select name="locations" id="locations">
                  <option value="central">Central</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </select>
              </td>
            </tr>
          </table>

          <div className={"button_div"}>
            
            <Link to={{
              pathname: '/list',
              time: time
            }}>
              <Button variant="success" size="sm">Continue</Button>{' '}
            </Link>
          </div>


        </div>

      </div>
    );
  }
}

export default CalendarDisplay