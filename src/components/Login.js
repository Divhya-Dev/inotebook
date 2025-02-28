import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const {login, showAlert} = useContext(noteContext);
    const [data, setData] = useState({email: "", password: ""});
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const token = await login(data.email, data.password);

        if(token.status === 'fail')
        {
            handleError(token.error);
            showAlert(token.error, 'danger');
        }
        else
        {
            showAlert('Successfully Logged In.', 'success')
            localStorage.setItem('token', token.authToken);
            navigate("/");
        }
    }

    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleError = (msg) =>{
        setError(msg);
        // setTimeout(()=> 
        // setError(null), 5000);
    }

    return (
        <>
        <div className="container mt-3">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3 ">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
        </div>
        </>
    )
}

export default Login;