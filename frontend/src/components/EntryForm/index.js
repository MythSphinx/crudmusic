import "./index.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from 'react-modal';
import FormModal from "../FormModal"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


Modal.setAppElement("#root");

function EntryForm() {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState("");
  const handleClose = () => {
    setShow(false);
    setTitle("");
    setType("Album")
    setArtist("");
    setDate("");
    setNote("");
    setEdit(false);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/entries").then((response) => {
      setEntryList(response.data);
    });
  }, []);

  useEffect(() => {
    if(show === true && edit === true) {

    }
  }, [show, edit]);

  const optionsType = [
    { value: "Album", text: "Album" },
    { value: "Single", text: "Single" },
    { value: "EP", text: "EP" },
  ];

  const [title, setTitle] = useState("");
  const [type, setType] = useState(optionsType[0].value);
  const [artist, setArtist] = useState("");
  const [releasedate, setDate] = useState("");
  const [notes, setNote] = useState("");
  const [targetId, setTargetId] = useState("");
  const [entryList, setEntryList] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const updateEntry = (id, res) => {
    Axios.put("http://localhost:3001/edit", {
      title: newTitle,
      id: id,
    }).then((response) => {
      setEntryList(
        entryList.map((val) => {
          return (val.id === id
            ? {
                id: id,
                title: title,
                type: type,
                artist: artist,
                releasedate: releasedate,
                notes: notes,
              }
            : val)
        }
        ))
    });
  };

  const deleteEntry = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEntryList(
        entryList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  const loadValues = (index) => {
    setTitle(entryList[index].title)
    setType(entryList[index].type)
    setArtist(entryList[index].artist)
    setDate(entryList[index].releasedate)
    setNote(entryList[index].notes)
  }

  return (
    <div id="app">
      <FormModal show={show} handleClose={handleClose} updateEntry={updateEntry} edit={edit} setEdit={setEdit} handleShow={handleShow} entryList={entryList} setEntryList={setEntryList} title={title} setTitle={setTitle} type={type} setType={setType} artist={artist} setArtist={setArtist} releasedate={releasedate} setDate={setDate} notes={notes} setNote={setNote} targetId={targetId}/> 
      <h1 className="intro">MUSIC WAITLIST</h1>
      <div className="intro">
        <span id="description">
          A list to keep track of your most anticipated music
        </span>
      </div>
      <div id="modal-button-wrapper">
        <button id="modal-button" onClick={handleShow}>
          Add New Entry
        </button>
      </div>
      <div>
      
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

              {entryList.map((val, index) => {
                return (
                  <tbody key={index} id="">
                    <tr>
                      <td>{val.title}</td>
                      <td>{val.type}</td>
                      <td>{val.artist}</td>
                      <td>{val.releasedate}</td>
                      <td>{val.notes}</td>
                      <td>
                        <button
                          id="edit-entry"
                          onClick={() => {
                            setTargetId(val.id)
                            handleShow();
                            setEdit(true);
                            loadValues(index);
                          }}
                        >
                          <EditOutlined />
                        </button>

                        <button
                          id="delete-entry"
                          onClick={() => {
                            deleteEntry(val.id);
                          }}
                        >
                          <DeleteOutlined />
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
