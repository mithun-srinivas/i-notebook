import React, {useContext} from "react";
import Notecontext from "../context/notes/NoteContext";

export default function Modal(props) {
    const context = useContext(Notecontext);
    const { EditNote } = context;
const editNote = (id) => {
    
    const title = document.getElementById('title')
    const description = document.getElementById('description')
    const tag = document.getElementById('tag')
    EditNote(id, title, description, tag)
}

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {`Update Your NoteBook`}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                <div className="modal-footer">
                    <button
                    type="submit"
                    className="btn btn-primary mt-2 mx-3 "
                    onClick={editNote(props.id)}
                    >
                    Update Note
                    </button>
                    <button type="button" class="btn btn-secondary mx-3" data-bs-dismiss="modal">Close </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
