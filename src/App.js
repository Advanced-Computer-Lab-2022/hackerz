import React, {useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import InstructorCourses from './components/InstructorCourses';
import Home from './components/Home';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [user, setUser] = useState({username: "beedoz"}); //for testing purposes, user is always beedoz
  const usernameRef = useRef();
  
  const login = async () => {
    const username = usernameRef.current.value;
    setUser({username: username})
  }



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
            <Nav.Link href="/corp">Corporate</Nav.Link>
            <NavDropdown title="Instructor" id="basic-nav-dropdown">
              <NavDropdown.Item href="/instructor/my-courses">View My Courses</NavDropdown.Item>
              <NavDropdown.Item href="/instructor/add-course">Add New Course</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin/add-admin">Add Another Admin</NavDropdown.Item>
              <NavDropdown.Item href="/admin/add-corp">Add Corporate Trainee</NavDropdown.Item>
              <NavDropdown.Item href="/admin/add-instructor">Add Instructor</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <input className="m-1" ref={usernameRef} placeholder="Search" type="search"/>
          <button onClick={login}>Login</button>

          <Navbar.Text>Hello, {user.username ? user.username : "Guest"}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/instructor/my-courses' element={<InstructorCourses user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
