import {React, useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Alert = (props) => {

  const {alert} = useContext(noteContext);

  if(!alert)
    return null;

  return (
    <>
      <div className="alert alert-warning" role="alert">
        {alert.message}
      </div>
    </>
  );
};

export default Alert;
