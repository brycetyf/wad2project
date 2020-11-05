import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Restaurant } from '@material-ui/icons';


class List extends Component {


  constructor(props) {
    super(props);

    this.state = {

      restaurants : '',
      locations: {
        central: [1.2865, 103.8412],
        north: [1.4304, 103.8354],
        south: [1.2655, 103.8239],
        east: [1.3236, 103, 9273],
        west: [1.3329, 103.767],
      },

    }
    
  }  
  componentDidMount() {

    const { apiDate,location,time } = this.props;

    let location_details = this.state.locations[location];
    let latitude = location_details[0];
    let longitude = location_details[1];

    axios.get(`https://api.quandoo.com/v1/merchants?place=singapore&capacity=2&offset=0&limit=50&fromtime=${time}&date=${apiDate}&centerPoint=${latitude}.${longitude}`).then((res) =>
    this.setState({
      restaurants: res,
    }))

    console.log(this.state.restaurants);

  }


  render() {

    return (
    <div className="">
      <h1>HELLO</h1>
    </div>
    )
}
}

export default List