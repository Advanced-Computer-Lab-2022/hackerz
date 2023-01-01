import React, {useState, useRef, useEffect} from 'react';
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
import MyCourses from './components/MyCourses';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CountriesList from './components/CountriesList';
import Home from './components/Home';
import CreditCardInfo from './components/CreditCardInfo';
import CheckoutIndex from './components/CheckoutIndex';
import Subtitle from './components/Subtitle';
import countries from './countries.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import InstructorsList from './components/InstructorsList';

const axios = require('axios').default;
const APIURL = "http://localhost:5000";

function App() {
  const [user, setUser] = useState({username: ""});
  const [loggedIn, setLoggedIn] = useState(false);
  const usernameRef = useRef();

  const login = async () => {
    const username = usernameRef.current.value;
    //setUser({username: username})
    fetchUser(username);
    setLoggedIn(true);
  }

  const logout = async () => {
    setUser({username: ""})
    setLoggedIn(false);
  }

  const fetchUser = async (username) => {
    const response = await axios.get(APIURL + '/admin/get-user/' + username)
    const data = response.data;
    console.log(data); //testing purposes
    setUser(data);
  }

  useEffect(() => {
    console.log(user);
  },[user])

  return (
    <div>
      <BrowserRouter>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hackerz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-3">
            {user?.userType === "corpTrainee" ? <NavLink className="mx-2 vertical-center" to="/corp">Search</NavLink> 
            :<NavLink className="mx-2 vertical-center" to="/search">Search</NavLink>}
            <NavLink className="mx-2 vertical-center" to="/instructor">Instructors</NavLink>&nbsp;&nbsp;
            {user?.userType === "individualTrainee" || user?.userType === "corpTrainee" ? <NavLink className="mx-2 vertical-center" to="/enrolledCourses">Enrolled Courses</NavLink>:<></>}
            {user?.username !== ""? <NavLink className="mx-2 vertical-center" to="/editInfo">Reset password</NavLink>:<></>}
            {user?.userType === "admin" ? (<NavLink className="mx-2 vertical-center" to="/admin">Admin</NavLink>) : <div></div> }
            { user?.userType === "instructor" ? <NavDropdown title="Instructor" id="basic-nav-dropdown">
              <NavLink to="/instructor/my-courses">View My Courses</NavLink><br/>
              <NavLink to="/instructor/add-course">Add New Course</NavLink>
              <NavLink to="/instructor/editbiography">Edit Biography</NavLink>
              <NavLink to="/instructor/editusermail">Edit Mail</NavLink>
            </NavDropdown>:<></>}
          </Nav>
          { loggedIn ? <></> : <input className="m-2" ref={usernameRef} placeholder="Username" type="search"/> }
          { loggedIn ? <button className="m-2" onClick={logout}><div className="mx-2">Logout</div></button> 
          : <button className="m-2" onClick={login}><div className="mx-2">Login</div></button> }
          <Navbar.Text className="mx-4">Hello, {user?.username ? user?.username : "Guest"}</Navbar.Text>
          <NavDropdown title = "Country" id="countries-dropdown">
            <CountriesList countries = {countries}/>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Routes>  
          <Route path='/'/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/corp' element={<CorpCourses/>}/>
          <Route path='/instructor' element={<InstructorsList/>}/>
          { user?.userType === "instructor" ? <>
          <Route path='/instructor/my-courses' element={<InstructorCourses user={user}/>}/>
          <Route path='/instructor/add-course' element={<AddCourse user={user}/>}/>
          <Route path='/instructor/editbiography' element={<EditBiography user={user}/>}/>
          <Route path='/instructor/editusermail' element={<EditMail user={user}/>}/></> 
          : <Route path='/instructor/:x' element={<h1>UNAUTHORIZED ACCESS</h1>}/>}
         
          {user?.userType === "admin" ? <Route path='/admin' element={<AdminPanel/>}/> 
          : <Route path='/admin' element={<h1>UNAUTHORIZED ACCESS</h1>}/>}

          <Route path='/course/:id' element={<CourseView user={user}/>}/>
          <Route path='/course/:id/exercises' element={<ExerciseList user={user}/>}/>
          <Route path='/course/:id/add-exercise' element={<AddExercise/>}/>
          <Route path='/course/:id/pay' element={<CreditCardInfo user={user}/>}/>
          <Route path='/course/:id/checkout/' element={<CheckoutIndex/>}/>
          <Route path='/course/:id/:subtitleID/' element={<Subtitle user={user}/>}/>
          <Route path='/exercise/:id' element={<ExerciseView user={user}/>}/>
          <Route path='/editInfo' element={<ResetPassword/>}/>
          <Route path='/reset-password/:userid/:token' element={<ValidateMail/>}/>
          <Route path='/enrolledCourses' element={<MyCourses user={user}/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
