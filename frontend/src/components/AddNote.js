import React from "react";
import { useContext } from "react";
import { useState } from "react";
import NoteContext from "../context/notes/notecontext";

const AddNote = () => {
  // const context = 
  const { addNote } = useContext(NoteContext);
  
    const [note, setNote] = useState({ title: "", description: "", tag: "" });   
    
  const handleClick = (e) => {
    e.preventDefault();
    console.log("adding a new note", note);
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    console.log("on change");
    console.log(e);
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const isDisabled = note.title.length < 4 || note.description.length < 6 || note.tag.length < 1;
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
             value={note.title}
            onChange={onChange}
            placeholder="Min length of title is 3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange} value={note.description}
            placeholder="Min length of description is 5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange} value={note.tag}
            placeholder="Tag cannot be empty"
          />
        </div>
        <button
          disabled={isDisabled}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
