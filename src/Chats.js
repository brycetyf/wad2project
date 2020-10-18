import React from "react";
import Chat from './Chat';
import "./Chats.css";

function Chats() {
  return (
    <div className="chats">
      <Chat
        name="Sarah"
        message="Hey! how are you"
        timestamp="35 minutes ago"
        profilePic=""
      />
      <Chat
        name="Muthu"
        message="Hey! how are you"
        timestamp="35 minutes ago"
        profilePic=""
      />
      <Chat
        name="Sami"
        message="Hey! how are you"
        timestamp="35 minutes ago"
        profilePic=""
      />
      <Chat
        name="Nat"
        message="Hey! how are you"
        timestamp="35 minutes ago"
        profilePic=""
      />
    </div>
  );
}

export default Chats;
