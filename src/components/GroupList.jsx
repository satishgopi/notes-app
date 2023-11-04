import React from "react";

function GroupList({ groups, setSelectedGroup, selectedGroup }) {
  return (
    <ul className="group-profileBox">
      {groups.map((group) => (
        <li key={group.id}>
          <div
            onClick={() => setSelectedGroup(group.id)}
            className={
              selectedGroup === group.id
                ? " selected group-profile"
                : " group-profile"
            }
          >
            <div
              className="profile-cicle"
              style={{ backgroundColor: `${group.color}` }}
            >
              <h2>{group.name ? group.name.slice(0, 2) : ""}</h2>
            </div>
            <h1>{group.name}</h1>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GroupList;
