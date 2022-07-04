import React, {useContext} from "react";
import Notecontext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(Notecontext);
  const { addNote } = context;

  const clickedAddNote = (e) => {
    const note = {
        'title': document.getElementById('title').value ,
        'description': document.getElementById('description').value ,
        'tag': document.getElementById('tag').value 
    }
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    console.log(note);
    console.log('yes');
  }

  return (
    <div>
      <form className="NotesForm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
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
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={clickedAddNote}>
          Add Note
        </button>
      </form>
    </div>
  );
}
