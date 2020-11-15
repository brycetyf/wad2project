import React from "react";
import Chat from "./Chat";
import "../../styles/Chats.css";

function Chats({ matched_users }) {
  /*
  This displays all the chats available for the user to view from and clicking into it will reveal the component  
  */
  return (
    <div className="chats">
      {matched_users.map((m) => (
        <Chat
          name={m.name}
          message={m.message}
          timestamp={m.lastonline}
          profilePic={m.url}
          key={m.unique_id}
        />
      ))}
    </div>
  );
}
export default Chats;
