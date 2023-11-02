import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import RightBar from "../components/RightBar";
import "../pages/home.css";
import ChatProfile from "../components/ChatProfile";
import { v4 as uuid } from "uuid";

const Home = () => {
  const [note, setNote] = useState([]);
  const getData = (name, color) => {
    setNote((prevNotes) => [
      ...prevNotes,
      {
        id: uuid(),
        nameE: name,
        colorE: color,
      },
    ]);
    console.log("dhdi", name, color);
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("profileData"));
    if (storedNotes) {
      setNote(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(note));
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
