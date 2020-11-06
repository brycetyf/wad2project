import React from "react";
import "../styles/Header.css";
import PersonIcon from "@material-ui/icons/Person";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TodayIcon from "@material-ui/icons/Today";
import { Link, useHistory, withRouter } from "react-router-dom";
import ghost_me_not from "../images/ghost_me_not.jpg";

function Header({
  backButton,
  chatCalender,
  renderCorrectCards,
  update_messages,
}) {
  const history = useHistory();
  return (
    // BEM
    <div className="header">
      {backButton ? (
        <IconButton
          onClick={() => history.goBack()}
          onMouseOver={() => renderCorrectCards()}
        >
          <ArrowBackIosIcon fontSize="large" className="header__icon" />
        </IconButton>
      ) : (
        <IconButton>
          <Link to="/myProfile">
            <PersonIcon className="header__icon" fontSize="large" />
          </Link>
        </IconButton>
      )}
      <img
        className="header__logo"
        src={ghost_me_not}
        alt="ghost me not logo"
      ></img>
      {chatCalender ? (
        <IconButton>
          <Link to="/scheduler">
            <TodayIcon fontSize="large" className="header__icon" />
          </Link>
        </IconButton>
      ) : (
        <IconButton>
          <Link to="/chats" onMouseOver={() => update_messages()}>
            <QuestionAnswerIcon className="header__icon" fontSize="large" />
          </Link>
        </IconButton>
      )}
    </div>
  );
}
export default Header;
