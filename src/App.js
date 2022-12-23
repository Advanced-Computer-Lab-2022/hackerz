import React, {useState, useRef } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Search from './components/Search';
import InstructorCourses from './components/InstructorCourses';
import CorpCourses from './components/CorpCourses';
import CourseView from './components/CourseView';
import AddCourse from './components/AddCourse';
import AdminPanel from './components/AdminPanel';
import ExerciseList from './components/ExerciseList';
import ExerciseView from './components/ExerciseView';
import AddExercise from './components/AddExercise';
import EditMail from './components/EditMail';
import EditBiography from './components/EditBiography'
import Container from 'react-bootstrap/Container';
import ValidateMail from './components/ValidateMail';
import ResetPassword from './components/ResetPassword';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CountriesList from './components/CountriesList';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import countries from './countries.json';
import CorpAuth from './components/CorpAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import InstructorsList from './components/InstructorsList';
import AdminAuth from './components/AdminAuth';
import InstructorAuth from './components/InstructorAuth';
//import Register from './components/Register';


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
            <NavLink className="mx-2 vertical-center" to="/instructor">Instructors</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/search">Search</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/admin">Admin</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/corp">Corporate</NavLink>&nbsp;&nbsp;
            <NavLink className="mx-2 vertical-center" to="/editInfo">Reset password</NavLink>&nbsp;&nbsp;
            <NavDropdown title="Instructor" id="basic-nav-dropdown">
              <NavLink to="/instructor/my-courses">View My Courses</NavLink><br/>
              <NavLink to="/instructor/add-course">Add New Course</NavLink>
              <NavLink to="/instructor/editbiography">Edit Biography</NavLink>
              <NavLink to="/instructor/editusermail">Edit Mail</NavLink>
            </NavDropdown>
        
          </Nav>
          <input className="m-2" ref={usernameRef} placeholder="Username" type="search"/>
          <button className="m-2" onClick={login}>Login</button>
          <Navbar.Text className="mx-4">Hello, {user.username ? user.username : "Guest"}</Navbar.Text>
            <NavDropdown title = "Country" id="countries-dropdown">
              <CountriesList countries = {countries}/>
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
        <Routes>
          <Route path='/'/>
          <Route path='/' element={<Home/>}/>
          <Route path='/instructor' element={<InstructorsList/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/course/:id' element={<CourseView user={user}/>}/>
          <Route path='/corp' element={<CorpAuth/>}/>
          <Route path='/instructor/my-courses' element={<InstructorAuth user={user}/>}/>
          <Route path='/instructor/add-course' element={<AddCourse user={user}/>}/>
          <Route path='/instructor/editbiography' element={<EditBiography user={user}/>}/>
          <Route path='/instructor/editusermail' element={<EditMail user={user}/>}/>
          <Route path='/admin' element={<AdminAuth/>}/>
          <Route path='/exercise/:id' element={<ExerciseView user={user}/>}/>
          <Route path='/course/:id/exercises' element={<ExerciseList user={user}/>}/>
          <Route path='/course/:id/add-exercise' element={<AddExercise/>}/>
          <Route path='/editInfo' element={<ResetPassword/>}/>
          <Route path='/reset-password/:userid/:token' element={<ValidateMail/>}/>
          <Route path='/home/register' element={<Register/>}/>
          <Route path='/home' element={<Login/>}/>
      

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
