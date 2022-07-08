import "./index.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function EntryForm() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/entries").then((response) => {
      setEntryList(response.data);
    });
  }, []);

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

  const deleteEntry = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div>
      <h1 className="intro">MUSIC WAITLIST</h1>
      <div className="intro">
        A list to keep track of your most anticipated music
      </div>
      <div>
        <button id="modalbutton" onClick={openModal}>
          Add New Entry
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          overlayClassName={"modaloverlay"}
        >
          <button id="closemodal" onClick={closeModal}>
            ✖
          </button>
          <section id="modalsection">
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
        </Modal>
        <section className="butshow">
          <div>
            <table className="list">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Artist</th>
                  <th>Release Date</th>
                  <th>Notes</th>
                  <th>Options</th>
                </tr>
              </thead>
              {entryList.map((val) => {
                return (
                  <tbody>
                    <tr>
                      <td>{val.title}</td>
                      <td>{val.type}</td>
                      <td>{val.artist}</td>
                      <td>{val.releasedate}</td>
                      <td>{val.notes}</td>
                      <td>
                        <button
                          id="delete-entry"
                          onClick={() => {
                            deleteEntry(val.title);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          id="delete-entry"
                          onClick={() => {
                            deleteEntry(val.title);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EntryForm;
