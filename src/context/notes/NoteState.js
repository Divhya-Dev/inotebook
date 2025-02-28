import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const initialNote = [];

  
    const [notes, setNote] = useState(initialNote);
    const [alert, setAlert] = useState()

  //Handle Login
  const login = async(email, password) =>{

    const token = await callAPI('auth/login', 'POST', "", {email, password});
    return token;

  }

  //Handle Sign up
  const signup = async(name, email, password) =>{
    //console.log(name + email+ password);
    const token = await callAPI('auth/createUser', 'POST', "", {name, email, password});
    return token;
  }


    //Handle Alert
    const showAlert= (msg, type) => {
        setAlert({
        message: msg,
        type: type
        })
        setTimeout(() => setAlert(null), 2000)
    }

    //Fetch Notes
    const getNotes = async() =>{

        const noteList = await callAPI('notes/getNotes', 'GET', localStorage.getItem('token'));
        setNote(noteList);

    }

    //Add Notes
    const addNotes = async(title, description, tag) =>{

        const noteDetail = await callAPI('notes/addNotes', 'POST', localStorage.getItem('token'), {title, description, tag});
        setNote(notes.concat({
                "user": noteDetail.user,
                "title": noteDetail.title,
                "description": noteDetail.description,
                "tag": noteDetail.tag,
                "date": noteDetail.date,
                "_id": noteDetail._id,
                "__v": 0  
        }));
        return noteDetail;
    }

    //Update Notes
    const updateNote = async(id, title, description, tag) =>{
    
        const newNote = {id,title, description, tag};
        await callAPI('notes/updateNote', 'PUT', localStorage.getItem('token'), newNote);

        const updatedNotes = notes.map((note) => {
                if(note._id === id){
                    
                    return {...note, title, description, tag};
                }
                    
                return note;
            })
        
        setNote(updatedNotes);
      
    }


    //Delete Notes
    const deleteNote = async(id) =>{
        await callAPI(`notes/deleteNote/${id}`, 'DELETE', localStorage.getItem('token'));
        setNote(notes.filter((note) => note._id !== id));
        
    }


    //CALL API for DB operations
    const callAPI = async(path,method, header, req) =>{
        try
        {
            const options = {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": header || ""
                }
              };
          
              // Only add body if the method is not GET
              if (method !== 'GET' && method !== 'DELETE'){
                options.body = JSON.stringify(req || null);
              }
          
              const response = await fetch(host + path, options);
              const json = await response.json();
              //console.log(json)
            return json;
        }
        catch(err)
        {
            console.error(err.message);
        }  
    }

 
  return (
    <noteContext.Provider value={{login, signup, notes, setNote, alert, setAlert, showAlert, getNotes, addNotes, updateNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
