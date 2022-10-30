import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

function InstructorCourses({user}) {
  const [courses, setCourses] = useState([]);
  const searchRef = useRef();
  const subjectRef = useRef();
  const username = user.username;
  const searchCourses = async () => {
    const query = searchRef.current.value;
    const subject = subjectRef.current.value;
    const params = { query, subject }
    const response = await axios.get(APIURL + '/instructor/'+ username + '/my-courses', { params })
    const data = response.data;
    console.log(data); //testing purposes
    console.log(user)
    setCourses(data);
  }
 
  useEffect(() => {
    searchCourses();
  },[])

  return (
    <div className="m-3">
        <input className="m-1" ref={searchRef} placeholder="Search" type="search"/>
        <button onClick={searchCourses}>Search</button> 
        <input className="m-4" ref={subjectRef} placeholder="Subject" type="text"/><br/>
        
      <h2>Search Results:</h2>
      <hr></hr>
      {
        courses?.length > 0 ? (
          <div>
            <CoursesList courses = {courses}/>
          </div>
        ) : (
          <div>
            <h2>No Courses Found</h2>
          </div>
        )
      }
    </div>
  );
}

export default InstructorCourses;