import React, { useContext } from "react";
import Alert from "./Alert";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) =>{

    const {note, openNote} = props;
    const {showAlert, deleteNote} = useContext(noteContext);

    const handleClick = async(id) =>{
        await deleteNote(id);
        showAlert('Note has been deleted.');
    }

    return(
        <>
        <div className="card text-bg-light mb-3 my-3" style={{maxWidth: '18rem'}}>
            <div className="card-header">{note.title}</div>
            <div className="card-body">
                <h5 className="card-title">{note.tag}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-regular fa-pen-to-square mx-2" onClick={()=> openNote()}></i>
                <i className="fa-regular fa-trash-can mx-2" onClick={()=> handleClick(note._id)}></i>
            </div>
            
        </div>
        </>
    )
}

export default NoteItem;