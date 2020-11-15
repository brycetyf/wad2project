import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../styles/DateDetails.css";
import Weather from "./Weather";
import Gif from "./gif";

class DateDetails extends Component {
  state = {
    reservation: "",
    date_vocab: [
      "lovely",
      "exciting",
      "awesome",
      "magical",
      "fun",
      "brilliant",
    ][Math.floor(Math.random() * 5)],
  };
  componentDidMount() {
    const api_key = "FwThwwuTTlsGSSjWwmw6PKQoBXJZ8pcv";
    const query = "good luck";
    const limit = 20;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=${limit}`;
    axios
      .get(url)
      .then((res) => this.setState({ gif: <Gif gif_arr={res.data} /> }));

    const date_id = window.location.pathname.split("/")[2];
    axios
      .get(`http://127.0.0.1:5001/get_particular_reservation/${date_id}`)
      .then((res) => {
        this.setState({
          reservation: res.data.reservation_data[0],
          time_delta: this.calculate_time_delta(
            res.data.reservation_data[0].booking_date
          ),
        });
        this.fetchWeatherForecast();
      });
  }
  fetchWeatherForecast = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.reservation.lat}&lon=${this.state.reservation.lon}&appid=2ac200cd0f1d80f588861e0e396359d1&units=metric`
      )
      .then((res) => {
        let weather_array = [];
        res.data.list.map((forecast) => {
          if (
            forecast.dt_txt.split(" ")[0] == this.state.reservation.booking_date
          ) {
            let time = parseInt(forecast.dt_txt.split(" ")[1].split(":")[0]);
            if (
              // if the time difference is less than two hours, we use it for the forecast gauge
              Math.abs(
                forecast.dt_txt.split(" ")[1].split(":")[0] -
                  parseInt(this.state.reservation.booking_time)
              ) <= 4
            ) {
              weather_array.push(forecast);
            }
          }
        });
        this.setState({
          weather: <Weather w_arr={weather_array} />,
        });
      });
  };

  calculate_time_delta = (booking_date) => {
    // The number of milliseconds in one day
    const date1 = new Date(booking_date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  render() {
    return (
      <div className="countdown">
        <h2 className="countdown__details">{this.state.time_delta} days</h2>
        till your {this.state.date_vocab} date with
        <Link to={`/profile/${this.state.reservation.booking_partner}`}>
          <Avatar
            src={this.state.reservation.booking_partner_url}
            alt={this.state.reservation.booking_partner}
            style={{
              height: 150,
              width: 150,
              margin: "auto",
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </Link>
        <h2 className="date__name">{this.state.reservation.booking_partner}</h2>
        <hr />
        <div>
          <h2>Weather forecast</h2>
          {this.state.weather}
        </div>
        <hr />
        <div>{this.state.gif}</div>
        <br />
      </div>
    );
  }
}

export default DateDetails;
