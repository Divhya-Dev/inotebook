import React, { useContext, useEffect, useRef } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Navbar = (props) =>{

    let location = useLocation();
    const {showAlert} = useContext(noteContext);
    const navigate = useNavigate();
    const ref = useRef(null);

    const handleLogOut = () =>{
        showAlert('You have been Logged Out.', 'info');
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleProfile = () =>{
        ref.current.click();
        console.log("here");
        if(localStorage.getItem('token'))
            console.log('profile check');

    }

    // useEffect(() => {
    //     // Initialize the popover when the component is mounted
    //     const popover = new window.bootstrap.Popover(ref.current);
        
    //     // Clean up popover when component unmounts
    //     return () => {
    //         popover.dispose();
    //     };
    // }, []);


    return(
        <>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body "  data-bs-theme="dark">
            <div className="container-fluid ">
                <Link className="navbar-brand " to="/">INotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    { !localStorage.getItem('token') && <form>
                    <Link className="btn btn-outline-light mx-3" to="/login" role="button">Login</Link>
                    <Link className="btn btn-outline-light mx-3" to="/signup" role="button">Sign Up</Link>
                    </form>}
                    {localStorage.getItem('token') && <button className="btn btn-outline-light mx-3" role="button" onClick={handleLogOut}>Log out</button>}
                    {/* <button  ref={ref}  type="button" className="btn btn-secondary d-none" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
                        Popover on bottom
                    </button> */}
                    <i className="fa-solid fa-user fa-xl" style={{color: "#74C0FC"}} onClick={handleProfile}></i>
                    
                </div>
            </div>
            </nav>
        </>
    )
};

export default Navbar;