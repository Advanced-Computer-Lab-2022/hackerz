import React, {useEffect, useState, useRef} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import CoursesList from './components/CoursesList';
const APIURL = "http://localhost:5000";

function App() {
  const [courses, setCourses] = useState([]);
  const searchRef = useRef();
  
  const searchCourses = async () => {
    const query = searchRef.current.value;
    const response = await fetch(`${APIURL}/courses?query=`+query,{method: 'GET'});
    const data = await response.json();
    console.log(data); //testing purposes
    setCourses(data);
  }
 
  // useEffect(() => {
  //     searchCourses()
  // },[])

  return (
    <div>
      <input ref={searchRef} type="text"/>
      <button onClick={searchCourses}>Search</button>
      <h1>Search Results:</h1>
      <CoursesList courses = {courses}/>
    </div>
  );
}

export default App;
