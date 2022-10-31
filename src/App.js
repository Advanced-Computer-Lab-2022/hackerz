import React, {useState, useRef } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Search from './components/Search';
import InstructorCourses from './components/InstructorCourses';
import CorpCourses from './components/CorpCourses';
import CourseView from './components/CourseView';
import AddCourse from './components/AddCourse';
import AdminPanel from './components/AdminPanel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


function App() {
  const [user, setUser] = useState({username: ""});
  const usernameRef = useRef();

  const login = async () => {
    const username = usernameRef.current.value;
    setUser({username: username})
  }

  return (
    <div>
      <BrowserRouter>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hackerz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-3">
            <NavLink className="mx-2 vertical-center" to="/">Home</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/search">Search</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/admin">Admin</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/corp">Corporate</NavLink>&nbsp;&nbsp;
            
            <NavDropdown title="Instructor" id="basic-nav-dropdown">
              <NavLink to="/instructor/my-courses">View My Courses</NavLink><br/>
              <NavLink to="/instructor/add-course">Add New Course</NavLink>
            </NavDropdown>
           
          </Nav>
          <input className="m-2" ref={usernameRef} placeholder="Username" type="search"/>
          <button className="m-2" onClick={login}>Login</button>
          <Navbar.Text className="mx-4">Hello, {user.username ? user.username : "Guest"}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
        <Routes>
          <Route path='/'/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/course/:id' element={<CourseView/>}/>
          <Route path='/corp' element={<CorpCourses/>}/>
          <Route path='/instructor/my-courses' element={<InstructorCourses user={user}/>}/>
          <Route path='/instructor/add-course' element={<AddCourse user={user}/>}/>
          <Route path='/admin' element={<AdminPanel/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
