import React from "react";
import "../styles/Header.css";
import PersonIcon from "@material-ui/icons/Person";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TodayIcon from '@material-ui/icons/Today';
import { Link, useHistory } from "react-router-dom";

function Header({ backButton, chatCalender }) {
  const history = useHistory();
  return (
    // BEM
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon fontSize="large" className="header__icon" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
      )}
      <Link to="/">
        <img
          className="header__logo"
          src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png"
          alt="tinder logo"
        ></img>
      </Link>

      {chatCalender ? (
        <IconButton>
          <Link to="/calendar">
            <TodayIcon fontSize="large" className="header__icon" />
            </Link>
        </IconButton>
      ) : (
        <IconButton>
          <Link to="/chats">
            <QuestionAnswerIcon className="header__icon" fontSize="large" />
            </Link>
        </IconButton>
      )}


    </div>
  );
}
export default Header;
