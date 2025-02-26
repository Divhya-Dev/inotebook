import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";

const Notes = () => {

    const [note, changeNote] = useState({etitle: "", edescription: "", etag: ""});
    const { notes, setNote, getNotes, updateNote } = useContext(noteContext);
    const ref = useRef(null);

    useEffect(() => {
        const fetchNotes = async () => {
            await getNotes();
        }
        fetchNotes();
    }
        , [])

    const openNote = (currentNote) => {
        ref.current.click();
        changeNote({etitle: currentNote.etitle, edescription: currentNote.edescription, etag: currentNote.etag});

    }

    const handleChange= (e) =>{
        changeNote({
            ...note,
            [e.target.name] : e.target.value
        })
    }

    const handleClick= (e) =>{
        e.preventDefault();
        updateNote(note); 
    }

    return (
        <>
            <AddNotes />

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Note Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" >Title</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>
                {
                    notes.map((note) => {
                        return <div className="col-md-4" key={note._id}>
                            <NoteItem note={note} openNote={openNote} />
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Notes;