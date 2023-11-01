import React from "react";

const ChatProfile = (props) => {
  return (
    <div className="chat-profile">
      <div
        className="profile-icon"
        style={{ backgroundColor: `${props.color}` }}
      ></div>
      <h1>{props.text}</h1>
    </div>
  );
};

export default ChatProfile;
