import React, { Component } from "react";
import Header from "./components/Header";
import ProfileCards from "./components/cards/ProfileCards";
import Chats from "./components/chat/Chats";
import ChatScreen from "./components/chat/ChatScreen";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import axios from "axios";

class App extends Component {
  // var db = [];
  // fetch("http://localhost:5001/users")
  // .then(response =>response.json())
  // .then(data => {for(var user in data.users){
  //   db.push(data.users[user]);
  // }});
  // console.log(db);
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
              <Header backButton="/chats" />
              <ChatScreen />
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
