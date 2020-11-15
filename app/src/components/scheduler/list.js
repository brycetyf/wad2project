import React, { Component } from "react";
import axios from "axios";
import RestaurantCards from "./RestaurantCards.js";
import "../../styles/List.css";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      locations: {
        central: [1.2865, 103.8412],
        north: [1.4304, 103.8354],
        south: [1.2655, 103.8239],
        east: [1.3236, 103.9273],
        west: [1.3329, 103.767],
      },
    };
  }
  componentDidMount() {
    const { apiDate, location, time, cuisine, person } = this.props;
    let location_details = this.state.locations[location];
    let latitude = location_details[0];
    let longitude = location_details[1];

    let selected = [];
    cuisine.map(function (option) {
      selected.push(option);
    });

    var selected_str = selected.join(";");

    let strrr = `https://api.quandoo.com/v1/merchants?place=singapore&capacity=2&offset=0&limit=50&radius=2&bookable=true&fromtime=${time}&date=${apiDate}&centerPoint=${latitude}%2C${longitude}&tags=${selected_str}`;
    console.log(strrr);

    axios
      .get(
        `https://api.quandoo.com/v1/merchants?place=singapore&capacity=2&offset=0&limit=50&radius=2&bookable=true&fromtime=${time}&date=${apiDate}&centerPoint=${latitude}.${longitude}&tags=${selected_str}`
      )
      .then((res) => {
        this.setState({
          restaurants: res.data.merchants,
        });
        console.log(this.state.restaurants);
      });
  }

  render() {
    return (
      <div className="restaurant_list">
        <RestaurantCards
          restaurants={this.state.restaurants}
          booking_date={this.props.apiDate}
          booking_time={this.props.time}
          partner_name={this.props.person}
          partner_url={this.props.person_url}
        />
      </div>
    );
  }
}

export default List;
