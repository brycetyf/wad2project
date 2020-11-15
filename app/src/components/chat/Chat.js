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

function Chat({ name, message, profilePic, timestamp }) {
  return (
    <Link to={`/chats/${name}`} className={"chat__link"}>
      <div className={"chat__box"}>
        <Avatar className={"chat__image"} alt={name} src={profilePic} />
        <div className={"chat__details"}>
          {/* <h2 className={"chat__name"}>{name}<StyledBadge color='primary' badgeContent={""}/></h2> */}
          <h2 className={"chat__name"}>{name}</h2>
          <p>{message}</p>
        </div>
        <p className={"chat__timestamp"}>{timestamp}</p>
      </div>
    </Link>
  );
}

export default Chat;
