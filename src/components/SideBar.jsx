import React, { useState } from "react";

const SideBar = (props) => {
  const [model, setModel] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

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

  const toggleModal = () => {
    setModel(!model);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSelect = (e) => {
    const selectColor = e.currentTarget.getAttribute("value");
    setColor(selectColor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(name, color);
    setModel(false);
  };

  return (
    <div className="sidebar">
      <h1 className="header-title">Pocket Notes</h1>
      <button type="button" className="create-notes-btn" onClick={toggleModal}>
        + Create Notes group
      </button>
      {/* MODEL */}
      {model && (
        <div className="model">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="model-content">
            <h1 className="title">Create New Notes group</h1>
            <form onSubmit={handleSubmit}>
              <div className="pop-flex">
                <h1>Group Name</h1>
                <input
                  type="text"
                  placeholder="Enter your group name...."
                  onChange={handleChange}
                />
              </div>
              <div className="pop-flex">
                <h1>Choose Colour</h1>
                <ul>
                  {colours.map((item) => {
                    return (
                      <li key={item.id}>
                        <div
                          className="color-box"
                          style={{ backgroundColor: `${item.color}` }}
                          value={item.value}
                          onClick={handleSelect}
                        ></div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div style={{ textAlign: "end" }}>
                <button type="submit" className="create-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
