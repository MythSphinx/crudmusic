import "./index.css";
import React, { useState, useEffect } from "react";
import {Modal, Button, Input, Select} from "antd";
import Axios from 'axios';

export default function EntryForm(props) {

  const optionsType = [
    { value: "Album", text: "Album" },
    { value: "Single", text: "Single" },
    { value: "EP", text: "EP" },
  ];

  const { Option } = Select;

  const submitEntry = () => {
    const updatedEntry = {
      title: props.title,
      type: props.type,
      artist: props.artist,
      releasedate: props.releasedate,
      notes: props.notes,
    }
    if(!props.edit){
      Axios.post("http://localhost:3001/add", updatedEntry );
      props.setEntryList([
        ...props.entryList,
        updatedEntry,
      ]);
    }
    else {
      props.updateEntry(props.targetId, props.title, props.type, props.artist, props.releasedate, props.notes)
    }
    props.handleClose()
  };

  return (
    <Modal
        visible={props.show}
        title= {props.edit ? "Edit Entry" : "Add New Entry"}
        id="entry-modal"
        onOk={props.handleShow}
        onCancel={props.handleClose}
        footer={[
          <Button key="back" onClick={props.handleClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={false} onClick={submitEntry}>
            Submit
          </Button>,
        ]}
      >
        <div id="entry-form">
              <label id="label-title">Title:</label>
              <Input
                type="text"
                value={props.title}
                onChange={(e) => {
                  props.setTitle(e.target.value);
                }}
              />
              <label id="label-title">Type:</label>
              <Select
                bordered={true}
                style={{borderRadius: "50px"}}
                value={props.type}
                id="select-type"
                onChange={(v) => {
                  props.setType(v);
                }}
              >
                {optionsType.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.text}
                  </Option>
                ))}
              </Select>

              <label id="label-title">Artist:</label>
              <Input
                type="text"
                value={props.artist}
                onChange={(e) => {
                  props.setArtist(e.target.value);
                }}
              />
              <label id="label-title">Release Date:</label>
              <Input
                type="date"
                value={props.releasedate}
                onChange={(e) => {
                  props.setDate(e.target.value);
                }}
              />
              <label id="label-title">Notes:</label>
              <Input
                type="text"
                value={props.notes}
                placeholder="(optional)"
                onChange={(e) => {
                  props.setNote(e.target.value);
                }}
              />
            </div>
      </Modal>
  );
}