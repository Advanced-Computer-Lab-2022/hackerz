//import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router , Routes, Route,  Link} from "react-router-dom";
//import Navbar from "./components/navbar.component";
import axios from 'axios';

import React from 'react';
import ReactDom from"react-dom";
import Courses from "./components/Courses"
import Corp_Courses from "./components/Corp_Courses"
import My_courses from "./components/My_courses"


function App ()  {
  return(
    <Router>
    <nav>
        <Link to ="/courses"> Courses</Link>
        <Link to ="/corp"> Corp_user</Link>
        <Link to ="/instructor"> My_courses</Link>
    </nav>
    <Routes>
      <Route path ="/courses" element ={<Courses />}/>
      <Route path ="/corp" element ={<Corp_Courses />}/>
      <Route path ="/instructor" element ={<My_courses />}/>
    
    </Routes>
  </Router>
  );
}

export default App;
