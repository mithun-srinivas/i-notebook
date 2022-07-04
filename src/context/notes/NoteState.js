import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const host = `http://localhost:6000`
    const notesInitial = [
        {
          "_id": "62c269c884b08df4bf6d6434",
          "user": "62c2697684b08df4bf6d632f",
          "title": "Mithun New",
          "description": "New Notes",
          "tag": "Personal",
          "timestamp": "2022-07-04T04:17:12.814Z",
          "__v": 0
        },
        {
          "_id": "62c26bae84b08df4bf6d6337",
          "user": "62c2697684b08df4bf6d632f",
          "title": "Mithun New2",
          "description": "New Notes",
          "tag": "Personal",
          "timestamp": "2022-07-04T04:25:18.983Z",
          "__v": 0
        },
        {
            "_id": "62c269c884b08df4bf6d6339",
            "user": "62c2697684b08df4bf6d632f",
            "title": "Mithun New",
            "description": "New Notes",
            "tag": "Personal",
            "timestamp": "2022-07-04T04:17:12.814Z",
            "__v": 0
          },
          {
            "_id": "62c26bae84b08df4bf6d6344",
            "user": "62c2697684b08df4bf6d632f",
            "title": "Mithun New2",
            "description": "New Notes",
            "tag": "Personal",
            "timestamp": "2022-07-04T04:25:18.983Z",
            "__v": 0
          },
          {
            "_id": "62c269c884b08df4bf6d6364",
            "user": "62c2697684b08df4bf6d632f",
            "title": "Mithun New",
            "description": "New Notes",
            "tag": "Personal",
            "timestamp": "2022-07-04T04:17:12.814Z",
            "__v": 0
          },
          {
            "_id": "62c26bae84b08df4bf6d6367",
            "user": "62c2697684b08df4bf6d632f",
            "title": "Mithun New2",
            "description": "New Notes",
            "tag": "Personal",
            "timestamp": "2022-07-04T04:25:18.983Z",
            "__v": 0
          }
      ]

      const[ notes, Setnotes] = useState(notesInitial)


      //Add note
      const addNote = (title, description, tag) => {
        //TODO: APP CALL
        const note = {
            "_id": "62c26bae84b08df4bf6d69",
            "user": "62c2697684b08df4bf6d632f",
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": "2022-07-04T04:25:18.983Z",
            "__v": 0
          };
        Setnotes(notes.concat(note))
      }



      //Delete Note
      const DeleteNote = (id) => {
          const newNotes = notes.filter((note) => (
            note._id !== id
           ) )
          Setnotes(newNotes)
        }



      //Edit a note
      const EditNote = async (id, title, description, tag) => {
        const data = {
          'title': title,
          'description': description,
          'tag': tag
        }
        const response = await fetch(`${host}/api/notes/updateNote/62beb483bb42cb466484fa67`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZWEyMzg5NjM4YTNlZjBkMmY2MzhlIn0sImlhdCI6MTY1NjY3MjAxMH0.PCf1Tk7_JxeYJWx4I8jB-hmssr6MmLvl3CNamSyOR1k'
          },
          body: JSON.stringify(data)
        })
        console.log(response.json);
        const responsejson = response.json
      }

    return(
        <NoteContext.Provider value={{notes, addNote, EditNote, DeleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;