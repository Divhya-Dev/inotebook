import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNotes = () =>{

    const {addNotes} = useContext(noteContext);
    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleSubmit = (e) =>{
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);

        // setNote({
        //     title
        // })
    }

    const handleChange = (e) =>{
     
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }



    return(
        <>
         <div className="container my-3">
            <h3>Add a Note</h3>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default AddNotes;