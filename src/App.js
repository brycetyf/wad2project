import React from "react";
import Header from "./Header";
import TinderCards from "./TinderCards";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
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
            <TinderCards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
