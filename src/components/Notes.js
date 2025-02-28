import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import {useNavigate} from "react-router-dom";

const Notes = () => {

    const [note, changeNote] = useState({eid: "",etitle: "", edescription: "", etag: ""});
    const { notes, getNotes, updateNote, showAlert } = useContext(noteContext);
    const ref = useRef(null);
    const refClose = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            if(localStorage.getItem('token'))
            {
                //console.log(localStorage.getItem('token'));
                await getNotes();
            }  
            else
                navigate("/login");
        }
        fetchNotes();
    }
        , [])

    const openNote = (currentNote) => {
        ref.current.click();
        //console.log(currentNote.etitle);
        changeNote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});

    }

    const handleChange= (e) =>{
        changeNote({
            ...note,
            [e.target.name] : e.target.value
        });
        //console.log(note);
    }

    const handleClick= (e) =>{
        e.preventDefault();
        updateNote(note.eid, note.etitle, note.edescription, note.etag); 
        refClose.current.click();
        showAlert('Note has been updated.', 'warning');
    }

    return (
        <>
            <AddNotes />

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Note Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3" onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" >Title</label>
                                    <input type="text" className="form-control" id="title" name="etitle" onChange={handleChange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="edescription" onChange={handleChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="etag" onChange={handleChange} value={note.etag} minLength={3} />
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref= {refClose}>Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length <5} className="btn btn-primary" onClick={handleClick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container">
                {( notes.length === 0 || notes.error) && 'No Notes to Display.'}
                </div>
                {
                   !notes.error && notes.map((note) => {
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