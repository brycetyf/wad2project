import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { Carousel } from "react-bootstrap";
import SchoolIcon from "@material-ui/icons/School";
import MoodBadIcon from "@material-ui/icons/MoodBad";
// import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";


class MyProfile extends Component{
  
  render(){
    return(
      <div className="profile">
        <Carousel controls={true} indicators={true}>
          <Carousel.Item>
            <img src={require('./dp/dp.png')} alt="jisoo1" className="sliderimg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={require('./dp/dp2.png')} alt="jisoo2" className="sliderimg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={require('./dp/dp3.webp')} alt="jisoo3" className="sliderimg" />
          </Carousel.Item>
        </Carousel>

        <div
          className="profile__area"
          style={{ background: "lightgrey", width: "100%" }}
        >
          <div className="profile__name">
            Kim Jisoo, 24
          </div>
          <div className="profile__description">
            <div className="profile__details">
              <MoodBadIcon />: 0
            </div>
            <div className="profile__details">
              <SchoolIcon />: YG
            </div>
            <div className="profile__details">
              <DescriptionIcon />: Blackpink Jisoo
            </div>
          </div>
        </div>

        <div className="upcomingDates">
          Placeholder: Dates inc
        </div>
      </div>

    )
  }
}



export default MyProfile