import React from "react";
import sendBut from "../assets/img/ic-type-enter.svg";
import bgImg from "../assets/img/bg-noteapp.png";
import lock from "../assets/img/ic-lock.svg";
import rightArrow from "../assets/img/ic-right-arrow.svg";

const NoteList = ({
  selectedGroup,
  notes,
  newNote,
  setNewNote,
  onAddNote,
  selectedGroupName,
  selectedGroupColor,
  onGoBack,
  noteClass,
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
    <div className={noteClass ? "mobile-block main-content" : "main-content"}>
      {selectedGroup ? (
        ""
      ) : (
        <div className="note-bg-wrapper">
          <div className="note-bg">
            <img src={bgImg} alt="" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div className="lock-encry">
            <div className="lock-btn">
              <img src={lock} alt="" />
              <p>end-to-end encrypted</p>
            </div>
          </div>
        </div>
      )}
      {selectedGroup && (
        <div className="profile-notelist">
          <button onClick={onGoBack} className="goBack-btn">
            <img src={rightArrow} alt="" />
          </button>
          <div
            className="profile-cicle"
            style={{ backgroundColor: selectedGroupColor }}
          >
            <h2>
              {selectedGroupName
                ? selectedGroupName.slice(0, 2).toUpperCase()
                : ""}
            </h2>
          </div>
          <h1>{selectedGroupName}</h1>
        </div>
      )}
      {selectedGroup && (
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
      )}
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
