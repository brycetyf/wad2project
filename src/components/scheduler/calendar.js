import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
class calendar extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default calendar