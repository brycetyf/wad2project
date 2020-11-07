import React, { Component } from "react";
import Header from "./components/Header";
import ProfileCards from "./components/cards/ProfileCards";
import Chats from "./components/chat/Chats";
import ChatScreen from "./components/chat/ChatScreen";
import Profile from "./components/Profile";
import MyProfile from "./components/myOwnProfile/MyProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Scheduler from "./components/scheduler/Scheduler";
import DateDetails from "./components/myOwnProfile/DateDetails";
import "./styles/App.css";
import axios from "axios";

class App extends Component {
  state = {
    profiles: [],
    cards: "",
    lastviewed: "",
    matched_users: [], //loaded when component mounts
    popup_gifs: [],
    person: "",
    person_url: "",
  };

  first_load_cards = () => {
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
            update_messages={() => this.update_messages()}
            popup_gifs={this.state.popup_gifs}
          />
        ),
      })
    );
  };
  componentDidMount() {
    /*
    When App.js is mounted successfully, an API call is made to our database to retrieve
    the potential match details and then it is passed to profile cards
    */

    //API call to load giphy urls for matching popup
    const api_key = "FwThwwuTTlsGSSjWwmw6PKQoBXJZ8pcv";
    const query = "woohoo";
    const limit = 20;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=${limit}`;
    axios
      .get(url)
      .then((res) =>
        this.setState({ popup_gifs: res.data.data }, this.first_load_cards())
      );

    // API call to get matched users chat
    axios.get(`http://127.0.0.1:5001/matched_users`).then((res) =>
      this.setState({
        matched_users: res.data.matched_users,
      })
    );
  }

  update_messages = () => {
    // API call to get matched users chat
    axios.get(`http://127.0.0.1:5001/matched_users`).then((res) =>
      this.setState({
        matched_users: res.data.matched_users,
      })
    );
    console.log("updating messages");
  };

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
              update_messages={this.update_messages}
              popup_gifs={this.state.popup_gifs}
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
              update_messages={this.update_messages}
              popup_gifs={this.state.popup_gifs}
            />
          ),
        })
      );
  };

  update_current_person = (person, person_url) => {
    /*
    for the reservation to load right, we need the update current person to flow
    */
    console.log(person);
    this.setState({
      person: person,
      person_url: person_url,
    });
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
                chatCalender="/scheduler"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <ChatScreen update_current_person={this.update_current_person} />
            </Route>

            <Route path="/chats">
              {/* Route to overview of all possible chats*/}
              <Header
                backButton="/"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <Chats matched_users={this.state.matched_users} />
            </Route>

            <Route path="/scheduler">
              {/* Route to view the calendar to choose date */}
              <Header
                backButton="go_back"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <Scheduler
                person={this.state.person}
                person_url={this.state.person_url}
              />
            </Route>

            {/* Let me just leave this here first. Shouldn't be needing it but just in case */}
            {/* <Route path="/list">
              <Header
                backButton="/scheduler"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
              />
              <List />
            </Route> */}

            <Route path="/profile/:person">
              {/* Route to view a specific profile*/}
              <Header
                backButton="/"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <Profile setLastViewed_profile={this.setLastViewed_profile} />
            </Route>

            <Route path="/matched_profile/:person">
              {/* Route to view a specific profile FROM inside of chat*/}
              <Header
                backButton="go_back"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <Profile setLastViewed_profile={this.setLastViewed_profile} />
            </Route>

            <Route path="/myProfile">
              {/* Route to view a specific profile FROM inside of chat*/}
              <Header
                backButton="go_back"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <MyProfile />
            </Route>

            <Route path="/DateDetails/:dateid">
              {/* Route to view a specific profile FROM inside of chat*/}
              <Header
                backButton="go_back"
                renderCorrectCards={() =>
                  this.renderCorrectCards(this.state.lastviewed)
                }
                update_messages={() => this.update_messages()}
              />
              <DateDetails />
            </Route>

            <Route path="/">
              {/* Route to HOME, always placed at the end*/}
              <Header update_messages={() => this.update_messages()} />
              {this.state.cards}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
