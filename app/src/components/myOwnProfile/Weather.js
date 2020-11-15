import React from "react";
import Table from "react-bootstrap/Table";

import Container from "react-bootstrap/Container";

function Weather({ w_arr }) {
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // basically want to check if there is any rain

  // if no rain then if the temp is hot then bring extra tissue to wipe

  // else just another normal day
  var rain_count = 0;
  var average_feels_like = 0;
  var advice = "";

  const count_rain = (str) => {
    let counter = 0;
    w_arr.map((forecast) => {
      if (forecast.weather[0].description.toLowerCase().includes("rain")) {
        rain_count++;
      }
      average_feels_like += forecast.main.feels_like;
      counter++;
    });
    average_feels_like = average_feels_like / counter;

    if (rain_count > 0) {
      advice = "Bring an umbrella. It looks like it will rain.";
    } else if (average_feels_like > 27.0) {
      advice = "Looks like its going to be warm. Bring some tissues.";
    } else {
      console.log(average_feels_like);
      advice = "Looks like weather is going to be perfect!";
    }
  };
  count_rain();
  return (
    <div>
      {w_arr.length ? (
        <div>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Forecast</th>
                  <th>Temp</th>
                  <th>Feels Like</th>
                </tr>
              </thead>
              <tbody>
                {w_arr.map((forecast) => (
                  <tr>
                    <td>{forecast.dt_txt.split(" ")[1]}</td>
                    <td>{toTitleCase(forecast.weather[0].description)}</td>
                    <td>{forecast.main.temp}</td>
                    <td>{forecast.main.feels_like}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4">Our Advice: {advice}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      ) : (
        <div>
          Looks like your date is still far away! Check back in a few days for
          an update.
        </div>
      )}
    </div>
  );
}

export default Weather;
