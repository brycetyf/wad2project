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
  };
  componentDidMount() {
    axios.get(`http://127.0.0.1:5001/users`).then((res) =>
      this.setState({
        profiles: res.data,
        cards: <ProfileCards profiles={res.data.users} />,
      })
    );
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/chats/:person">
              <Header backButton="/chats" chatCalender="/calendar" />
              <ChatScreen />
            </Route>

            <Route path="/calendar">
              <Header backButton="/chats" />
              <Calendar />
            </Route>

            <Route path="/chats">
              <Header backButton="/" />
              <Chats />
            </Route>

            <Route path="/profile/:person">
              <Header backButton="/" />
              <Profile />
            </Route>

            <Route path="/">
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
