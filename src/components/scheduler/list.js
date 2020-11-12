import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Restaurant } from "@material-ui/icons";
import CardGroup from "react-bootstrap/CardGroup";
import RestaurantCards from "./RestaurantCards.js";
import Card from "react-bootstrap/Card";
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
    console.log(cuisine);
    
    let selected = [];
    cuisine.map(function(option) {
      selected.push(option.value);
    })

    

    let selected_str = selected.join(';');
    console.log(selected_str);

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
    // let showCards = this.state.restaurants.map((restaurant) => {
    //   return (
    //     <RestaurantCards
    //       restaurant={restaurant}
    //       booking_date={this.props.apiDate}
    //       booking_time={this.props.time}
    //       partner_name={this.props.person}
    //       partner_url={this.props.person_url}
    //     />
    //   );
    // });
    return (
      <div className="restaurant_list">
        {/* <CardGroup>{showCards}</CardGroup> */}
        <RestaurantCards 
        restaurants={this.state.restaurants}
        booking_date={this.props.apiDate}
        booking_time={this.props.time}
        partner_name={this.props.person}
        partner_url={this.props.person_url}/>
      </div>
    );
  }
}

export default List;
