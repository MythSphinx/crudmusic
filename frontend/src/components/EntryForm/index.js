import "./index.css";
import React from "react";

function EntryForm() {
  return (
    <div className="entry-form">
      <h1 id="add-new">Add New Entry</h1>
      <div className="form">
        <label id="label-title">Title:</label>
        <input type="text" name="title" />
        <label id="label-title">Type:</label>
        <input type="text" name="type" />
        <label id="label-title">Artist:</label>
        <input type="text" name="artist" />
        <label id="label-title">Release Date:</label>
        <input type="text" name="release" />
        <label id="label-title">Notes:</label>
        <input type="text" name="notes" />
        <button type="button" class="button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default EntryForm;
