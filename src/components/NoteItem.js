import React, {useContext} from "react";
import "../App.css";
import Notecontext from "../context/notes/NoteContext";
import Modal from "./Modal";


export default function NoteItem(props) {
  const notes = props;
  const context = useContext(Notecontext);
  const { DeleteNote, EditNote } = context;


    const deleteNote = (id) => {
        DeleteNote(id)
    }

    const editNote = (id) => {
      EditNote(id, `hello`, `Who`, `personal`)
  }

   

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title ">{notes.note.title}</h5>
            <i className="fa-solid fa-trash-can ms-5 mx-3 mb-2" onClick={() => deleteNote(notes.id)}></i>
            <i className="fa-solid fa-pen-to-square mx-2 mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={editNote}></i>
            {/* <Modal id={notes.id} /> */}
          </div>
          <hr />
          <p className="card-text">{notes.note.description}</p>
        </div>
      </div>
    </div>
  );
}




