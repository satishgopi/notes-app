import React from "react";

const ChatProfile = (props) => {
  const trime = props.text;
  const valuee = trime.slice(0, 2);

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <div className="chat-profile" onClick={handleClick}>
      <div
        className="profile-icon"
        style={{ backgroundColor: `${props.color}` }}
      >
        {valuee}
      </div>
      <h1>{props.text}</h1>
    </div>
  );
};

export default ChatProfile;
