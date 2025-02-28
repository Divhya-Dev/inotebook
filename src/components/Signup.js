import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import {useNavigate} from "react-router-dom";

const Signup = () =>{

    const {signup, showAlert} = useContext(noteContext);
    const [data, setData] = useState({name: "", email: "", password: ""})
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const token = await signup(data.name, data.email, data.password);
        if(token.status === 'fail')
        {
            handleError(token.error);
            showAlert('Error:' + token.errors[0].msg, 'danger')
        }    
        else
        {
            showAlert('Successfully Signed Up.', 'success')
            localStorage.setItem('token', token.authToken);
            navigate("/");
        }
        
    }

    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleError = (msg) =>{
        setError(msg);
    }

    return(
        <>
        <div className="container mt-3">
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  name="email" onChange={handleChange} required/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"  name="password"onChange={handleChange} minLength={6} required/>
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup;