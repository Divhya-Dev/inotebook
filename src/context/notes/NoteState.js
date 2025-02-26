import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const initialNote = [];

  
    const [notes, setNote] = useState(initialNote);
    const [alert, setAlert] = useState()

    //Handle Alert
    const showAlert= (msg) => {
        setAlert({
        message: msg
        })
        setTimeout(() => setAlert(null), 2000)
    }

    //Fetch Notes
    const getNotes = async() =>{

        const noteList = await callAPI('notes/getNotes', 'GET', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiNWRiOGMxYTVhMzA2M2IwMThiODk5In0sImlhdCI6MTc0MDAzNjE3Nn0.PjDsN7_yq1XhTIvVgXHx13-iBZQTIaMVB7osOsS6XLg");
        //console.log(noteList);
        setNote(noteList);

    }

    //Add Notes
    const addNotes = async(title, description, tag) =>{

        await callAPI('notes/addNotes', 'POST', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiNWRiOGMxYTVhMzA2M2IwMThiODk5In0sImlhdCI6MTc0MDAzNjE3Nn0.PjDsN7_yq1XhTIvVgXHx13-iBZQTIaMVB7osOsS6XLg", {title, description, tag});
        setNote(notes.concat({
                "user": "67b5db8c1a5a3063b018b8949",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "Mon Feb 24 2025 17:07:09 GMT+0530 (India Standard Time)",
                "_id": "67bc59e53649cf43c77f8d6d800",
                "__v": 0  
        }))
    }

    //Update Notes
    const updateNote = async(id, title, description, tag) =>{
    
        const newNote = {}//{...note,title, description, tag};
        await callAPI('notes/updateNote', 'PUT', '', newNote);

        const updatedNotes = notes.map((note) => {
                if(note._id === id){
                    
                    return {...note,title, description, tag};
                }
                    
                return note;
            })
        
        setNote(updatedNotes);
      
    }


    //Delete Notes
    const deleteNote = async(id) =>{
        await callAPI(`notes/deleteNote/${id}`, 'DELETE', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiNWRiOGMxYTVhMzA2M2IwMThiODk5In0sImlhdCI6MTc0MDAzNjE3Nn0.PjDsN7_yq1XhTIvVgXHx13-iBZQTIaMVB7osOsS6XLg");
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
    <noteContext.Provider value={{notes, setNote, alert, setAlert, showAlert, getNotes, addNotes, updateNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
