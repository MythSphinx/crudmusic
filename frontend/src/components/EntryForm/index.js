import "./index.css";
import React, { useState } from "react";
import Axios from "axios";

function EntryForm() {
  const optionsType = [
    { value: "", text: "-- Choose an option --" },
    { value: "Album", text: "Album" },
    { value: "Single", text: "Single" },
    { value: "EP", text: "EP" },
  ];

  const [title, setTitle] = useState("");
  const [type, setType] = useState(optionsType[0].value);
  const [artist, setArtist] = useState("");
  const [releasedate, setDate] = useState("");
  const [notes, setNote] = useState("");
  const [entryList, setEntryList] = useState([]);

  const submitEntry = () => {
    Axios.post("http://localhost:3001/add", {
      title: title,
      type: type,
      artist: artist,
      releasedate: releasedate,
      notes: notes,
    });
    setEntryList([
      ...entryList,
      {
        title: title,
        type: type,
        artist: artist,
        releasedate: releasedate,
        notes: notes,
      },
    ]);
  };

  const getList = () => {
    Axios.get("http://localhost:3001/entries").then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <div>
        <h1 className="intro">Music Waitlist</h1>
        <div className="intro">
          A list to keep track of your most anticipated music
        </div>
        <section>
          <div className="form">
            <label id="label-title">Title:</label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label id="label-title">Type:</label>
            <select
              value={type}
              id="music-type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {optionsType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>

            <label id="label-title">Artist:</label>
            <input
              type="text"
              onChange={(e) => {
                setArtist(e.target.value);
              }}
            />
            <label id="label-title">Release Date:</label>
            <input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <label id="label-title">Notes:</label>
            <input
              type="text"
              placeholder="(optional)"
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
            <button onClick={submitEntry}>Submit</button>
          </div>
        </section>
        <section>
          <div className="butshow">
            <button onClick={getList}>Show List</button>
          </div>
          <div className="entry-list">
            {entryList.map((val) => {
              return (
                <div className="list">
                  <h1>{val.title}</h1>
                  <p>{val.type}</p>
                  <button
                  /*onClick={() => {
                      deleteNames(val.albumname);
                    }}*/
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    /*onChange={(e) => {
                      setNewEntry(e.target.value);
                    }}*/
                  />
                  <button
                  /*onClick={() => {
                      updateNames(val.albumname);
                    }}*/
                  >
                    Update
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default EntryForm;
