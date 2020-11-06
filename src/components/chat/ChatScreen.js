import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../../styles/ChatScreen.css";
import axios from "axios";

class ChatScreen extends Component {
  state = {
    messages: [],
    user_input: "",
    match_name: "",
    mounted: false,
  };

  componentDidMount() {
    this.fetchMessages();
    this.interval = setInterval(() => {
      this.fetchMessages();
    }, 10000);
  }

  fetchMessages = () => {
    /*
    Load the messages in from data base
    */
    const name = window.location.pathname.split("/")[2];
    axios.get(`http://127.0.0.1:5001/chat/${name}`).then((res) =>
      this.setState({
        messages: res.data.chats,
        mounted: true,
        match_name: res.data.chats[0].match_name,
      })
    );
  };

  handleSend = () => {
    /*
    UPDATES DATABASE WITH THE MESSAGE AND RELOADS THE ENTIRE PAGE
    */
    axios
      .get(
        `http://127.0.0.1:5001/send_message/match_name=${this.state.match_name}&message=${this.state.user_input}`
      )
      .then((res) => this.setState({ user_input: "" }));
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var partner_msg = this.state.messages;
    console.log("user input:", this.state.user_input);
    return this.state.mounted ? (
      <div className="chatScreen">
        <p className="chatScreen__timestamp">
          YOU MATCHED WITH {partner_msg[0].match_name.toUpperCase()} ON{" "}
          {partner_msg[0].match_date}
        </p>
        {partner_msg.map((message) =>
          message.sent_by_user ? (
            message.message ? (
              <div className="chatScreen__message" key={message.msgId}>
                <p className="chatScreen__textUser">{message.message}</p>
              </div>
            ) : (
              <div></div>
            )
          ) : (
            <Link to={"/matched_profile/" + message.match_name}>
              <div className="chatScreen__message">
                <Avatar
                  className="chatScreen__image"
                  alt={message.match_name}
                  src={message.url}
                />
                <p className="chatScreen__text">{message.message}</p>
              </div>
            </Link>
          )
        )}

        <form className="chatScreen__input">
          <input
            value={this.user_input}
            onChange={(e) => this.setState({ user_input: e.target.value })}
            className="chatScreen__inputField"
            type="text"
            placeholder="Type a message..."
          />
          <button
            className="chatScreen__inputButton"
            type="submit"
            onClick={this.handleSend}
          >
            SEND
          </button>
        </form>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default ChatScreen;
