import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/Calendar.css';
 
class calendar extends Component {
  state = {
    date: new Date(),
  };

  parseISOString(s) {
    var b = s.split(" ");
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
 
  onChange = date => this.setState({ date })
  render() {
    return (
        // add styling here 
      <div className={"calendar_whole"}>
          <div className={"calendar_title"}> BOOK YOUR DATE! </div>

          <div className={"calendar"}>
            <Calendar className={"calendar_design"}
            onChange={this.onChange}
            value={this.state.date}
            />
          </div>

        {/* to extract ISO datetime from calendar */}
        <div>{this.state.date.toString()}</div>

        {/* why run twice de o.o  */}
        <div>{console.log(this.state.date.toString())}</div>

        {/* tried calling the parse function but got some error :( ) */}
        {/* {this.parseISOString(this.state.date.toString())}    */}
        
        <div>hello</div>

      </div>
    );
  }
}

export default calendar