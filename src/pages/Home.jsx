import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import RightBar from "../components/RightBar";
import "../pages/home.css";
import ChatProfile from "../components/ChatProfile";

const Home = () => {
  const [note, setNote] = useState([]);
  const getData = (name, color) => {
    setNote((prevNotes) => [
      ...prevNotes,
      {
        id: "1",
        nameE: name,
        colorE: color,
      },
    ]);
    console.log("dhdi", name, color);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profileData"));
    if (data) {
      setNote(data);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("profileData", JSON.stringify(note));
  }, [note]);

  return (
    <div className="home">
      <div>
        <SideBar onSubmit={getData} />
        {note.map((item) => (
          <ChatProfile key={item.id} text={item.nameE} color={item.colorE} />
        ))}
      </div>
      <RightBar />
      {/* <Popup /> */}
    </div>
  );
};

export default Home;
