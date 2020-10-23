import React from "react";
import "../../styles/Chat.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

function Chat({ name, message, profilePic, timestamp }) {
  return (
    <Link to={`/chats/${name}`} className={"chat__link"}>
        <div className={"chat__box"}>
          <Avatar className={"chat__image"} alt={name} src={profilePic} />
          <div className={"chat__details"}>
            <h2 className={"chat__name"}>{name}</h2>
            <p>{message}</p>
          </div>
          <p className={"chat__timestamp"}>{timestamp}</p>
        </div>
    </Link>
  );
}

export default Chat;
