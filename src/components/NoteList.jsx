import React from "react";
import sendBut from "../assets/img/ic-type-enter.svg";

const NoteList = ({
  selectedGroup,
  notes,
  newNote,
  setNewNote,
  onAddNote,
  selectedGroupName,
  selectedGroupColor,
}) => {
  const filteredNotes = selectedGroup
    ? notes.filter((note) => note.groupId === selectedGroup)
    : notes;

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hours to 12-hour format

    return `${hours}:${minutes} ${ampm}`;
  }

  function formatDateMonthYear(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return (
    <div className="main-content">
      <h2>Notes</h2>
      {selectedGroup && (
        <div className="profile-notelist">
          <div
            className="profile-cicle"
            style={{ backgroundColor: selectedGroupColor }}
          >
            <h2>{selectedGroupName ? selectedGroupName.slice(0, 2) : ""}</h2>
          </div>
          <h1>{selectedGroupName}</h1>
        </div>
      )}
      <ul className="notes-list">
        {filteredNotes.map((note) => (
          <li key={note.id} className="note-item">
            <div className="note-meta">
              <p>{formatTime(note.lastUpdated)}</p>

              <p>{formatDateMonthYear(note.createdAt)}</p>
            </div>
            <div className="note-content">{note.content}</div>
          </li>
        ))}
      </ul>
      {selectedGroup && (
        <div className="note-input">
          <div style={{ position: "relative" }}>
            <textarea
              type="text"
              cols={10}
              rows={10}
              placeholder="Enter your note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={onAddNote}>
              <img src={sendBut} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;
