import React, {useEffect, useState, useRef} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoursesList from './components/CoursesList';
import Search from './components/Search';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


const axios = require('axios').default;
const APIURL = "http://localhost:5000";

function App() {
  
  return (
    <div>
       <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hackerz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link href="/instructor">Instructor</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/'/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
