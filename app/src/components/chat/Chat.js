import React from "react";
import "../../styles/Chat.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: -1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const calculate_time_delta = (timestamp) => {
  const date1 = new Date(timestamp);
  date1.setHours(date1.getHours() - 8);
  const date2 = new Date();

  var result = format_delta_to_lastseen(date1, date2);
  return result;
};

const format_delta_to_lastseen = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  var minutes_difference = Math.floor(
    (diffTime / (1000 * 60 * 60 * 24)) * 24 * 60
  );
  if (minutes_difference < 60) {
    return `${minutes_difference} minutes ago`;
  } else if (minutes_difference >= 60) {
    const hours_difference = Math.floor(minutes_difference / 60);
    if (hours_difference < 24) {
      return `${hours_difference} hours ago`;
    } else {
      const days_difference = Math.floor(hours_difference / 24);
      console.log(days_difference);
      return `${days_difference} days ago`;
    }
  }
};

function Chat({ name, message, profilePic, timestamp }) {
  let time_delta = calculate_time_delta(timestamp);

  return (
    <Link to={`/chats/${name}`} className={"chat__link"}>
      <div className={"chat__box"}>
        <Avatar className={"chat__image"} alt={name} src={profilePic} />
        <div className={"chat__details"}>
          {/* <h2 className={"chat__name"}>{name}<StyledBadge color='primary' badgeContent={""}/></h2> */}
          <h2 className={"chat__name"}>{name}</h2>
          <p>{message}</p>
        </div>
        <p className={"chat__timestamp"}>{time_delta}</p>
      </div>
    </Link>
  );
}

export default Chat;
