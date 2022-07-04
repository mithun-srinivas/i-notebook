import React, { useContext } from "react";
import Notecontext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(Notecontext);
  const { notes} = context;
  return (
    <>
    <AddNote />
    <div className="row my-3">
      <h2 className="addNote">Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem id={note._id} note={note}  />;
      })}
    </div>
    </>
  );
}
