import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import Alert from './components/Alert';
import noteContext from './context/notes/noteContext';

function App() {

  return (
   <>
   <BrowserRouter>
   <NoteState>
      <Navbar />
      <Alert />
      <div className='container my-3'>
      <Routes>
        <Route exact path= '/' element = {<Home/> }/>
        <Route exact path= '/about' element = {<About/> }/>
        <Route exact path= '/login' element = {<Login />} />
        <Route exact path= '/signup' element = {<Signup />} />
      </Routes>
      </div>
      </NoteState>
   </BrowserRouter>
   </>
  );
}

export default App;
