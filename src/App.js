import React, { Component } from "react";
import Header from "./components/Header";
import ProfileCards from "./components/cards/ProfileCards";
import Chats from "./components/chat/Chats";
import ChatScreen from "./components/chat/ChatScreen";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calendar from "./components/scheduler/calendar";
import "./styles/App.css";
import axios from "axios";

class App extends Component {
  state = {
    profiles: [],
    cards: "",
    lastviewed: "",
    matched_users: [], //loaded when component mounts
  };

  componentDidMount() {
    /*
    When App.js is mounted successfully, an API call is made to our database to retrieve
    the potential match details and then it is passed to profile cards
    */

    // API call to get cards
    axios.get(`http://127.0.0.1:5001/users`).then((res) =>
      this.setState({
        profiles: res.data,
        lastviewed: res.data.users.length,
        cards: (
          <ProfileCards
            profiles={res.data.users}
            setLastViewed_cards={() => this.setLastViewed_cards()}
            setLastViewed_profile={this.setLastViewed_profile}
          />
        ),
      })
    );

    // API call to get matched users chat
    axios.get(`http://127.0.0.1:5001/matched_users`).then((res) =>
      this.setState({
        matched_users: res.data.matched_users,
      })
    );
  }

  setLastViewed_profile = (lastViewedId) => {
    /*
    This helps to ensure that after viewing a profile and returning to the home screen,
    previous seen cards are not shown again.

    This is done by attaching a parameter - last seen ID to the URL when the user clicks
    back button while within a profile card
    */
    this.setState({
      lastviewed: lastViewedId,
    });
    axios
      .get(`http://127.0.0.1:5001/users/${this.state.lastviewed + 1}`)
      .then((res) =>
        this.setState({
          profiles: res.data,
          cards: (
            <ProfileCards
              profiles={res.data.users}
              setLastViewed_cards={() => this.setLastViewed_cards()}
              setLastViewed_profile={this.setLastViewed_profile}
            />
          ),
        })
      );
  };

  setLastViewed_cards = () => {
    /*
    When the user swipes / presses one of the buttons, we also needa set the last viewed
    */
    this.setState({
      lastviewed: this.state.lastviewed - 1,
    });
  };

  renderCorrectCards = () => {
    /*
    For when the user returns from chat button, to make sure that the correct cards are rendered
     */
    axios
      .get(`http://127.0.0.1:5001/users/${this.state.lastviewed + 1}`)
      .then((res) =>
        this.setState({
          profiles: res.data,
          cards: (
            <ProfileCards
              profiles={res.data.users}
              setLastViewed_cards={() => this.setLastViewed_cards()}
              setLastViewed_profile={this.setLastViewed_profile}
            />
          ),
        })
      );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/chats/:person">
              {/* Route to individual chats
              Note: ALL headers need to include renderCorrectCards*/}
              <Header
                backButton="/chats"
                chatCalender="/calendar"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
              />
              <ChatScreen />
            </Route>

            <Route path="/chats">
              {/* Route to overview of all possible chats*/}
              <Header
                backButton="/"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
              />
              <Chats matched_users={this.state.matched_users} />
            </Route>

            <Route path="/calendar">
              <Header
                backButton="/chats"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
              />
              <Calendar />
            </Route>

            <Route path="/profile/:person">
              {/* Route to view a specific profile*/}
              <Header
                backButton="/"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
              />
              <Profile setLastViewed_profile={this.setLastViewed_profile} />
            </Route>

            <Route path="/">
              {/* Route to HOME, always placed at the end*/}
              <Header />
              {this.state.cards}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
