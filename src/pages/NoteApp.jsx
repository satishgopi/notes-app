import React, { useState, useEffect } from "react";
import "./NoteApp.css"; // Import your CSS file for styling
import GroupList from "../components/GroupList";
import NoteList from "../components/NoteList";

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState("");

  const [hideMobile, setHideMobile] = useState(false);

  const colours = [
    {
      id: "1",
      color: "#B38BFA",
      value: "#B38BFA",
    },
    {
      id: "2",
      color: "#FF79F2",
      value: "#FF79F2",
    },
    {
      id: "3",
      color: "#43E6FC",
      value: "#43E6FC",
    },
    {
      id: "4",
      color: "#F19576",
      value: "#F19576",
    },
    {
      id: "5",
      color: "#0047FF",
      value: "#0047FF",
    },
    {
      id: "6",
      color: "#6691FF",
      value: "#6691FF",
    },
  ];

  useEffect(() => {
    // Load groups and notes from local storage on app load
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    if (storedGroups) setGroups(storedGroups);
    if (storedNotes) setNotes(storedNotes);
  }, []);

  useEffect(() => {
    // Save groups and notes to local storage whenever they change
    localStorage.setItem("groups", JSON.stringify(groups));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [groups, notes]);

  const handleAddGroup = () => {
    if (newGroupName.trim() === "") return;
    const newGroup = { id: Date.now(), name: newGroupName, color: color };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setColor("");
    setIsModalOpen(false); // Close the modal after adding the group
  };

  const handleSelect = (e) => {
    const selectColor = e.currentTarget.getAttribute("value");
    setColor(selectColor);
  };

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    const newNoteObj = {
      id: Date.now(),
      groupId: selectedGroup,
      content: newNote,
      createdAt: new Date().toLocaleString(),
      lastUpdated: new Date().toLocaleString(),
    };
    setNotes([...notes, newNoteObj]);
    setNewNote("");
  };

  const handleToggleSidebar = () => {
    setHideMobile(!hideMobile);
  };

  return (
    <div className="app-container">
      {hideMobile ? (
        <div className={hideMobile ? "sidebar mobile-hide" : "sidebar gg"}>
          <h1>Pocket Notes</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="create-notes-btn"
          >
            {" "}
            + Create Notes group
          </button>
          <GroupList
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            onGoBack={handleToggleSidebar}
          />
        </div>
      ) : (
        <div className={hideMobile ? "sidebar" : "sidebar mobile-block"}>
          <h1>Pocket Notes</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="create-notes-btn"
          >
            {" "}
            + Create Notes group
          </button>
          <GroupList
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            onGoBack={handleToggleSidebar}
          />
        </div>
      )}

      {hideMobile ? (
        <NoteList
          selectedGroup={selectedGroup}
          notes={notes}
          newNote={newNote}
          setNewNote={setNewNote}
          onAddNote={handleAddNote}
          selectedGroupName={
            selectedGroup
              ? groups.find((group) => group.id === selectedGroup).name
              : ""
          }
          selectedGroupColor={
            selectedGroup
              ? groups.find((group) => group.id === selectedGroup).color
              : ""
          }
          onGoBack={handleToggleSidebar}
          noteClass={true}
        />
      ) : (
        <NoteList
          selectedGroup={selectedGroup}
          notes={notes}
          newNote={newNote}
          setNewNote={setNewNote}
          onAddNote={handleAddNote}
          selectedGroupName={
            selectedGroup
              ? groups.find((group) => group.id === selectedGroup).name
              : ""
          }
          selectedGroupColor={
            selectedGroup
              ? groups.find((group) => group.id === selectedGroup).color
              : ""
          }
          onGoBack={handleToggleSidebar}
          noteClass={false}
        />
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-content">
            <h2>Create New Notes group</h2>
            <div className="pop-flex">
              <h1>Group Name</h1>
              <input
                type="text"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="pop-flex">
              <h1>Choose colour</h1>
              <ul>
                {colours.map((item) => (
                  <li key={item.id}>
                    <div
                      // className="color-box"
                      style={{ backgroundColor: `${item.color}` }}
                      value={item.value}
                      onClick={handleSelect}
                      className={
                        color === item.value
                          ? "border-color color-box"
                          : "color-box"
                      }
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ textAlign: "end" }}>
              <button className="create-btn" onClick={handleAddGroup}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
