import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

function CorpCourses() {
  const [courses, setCourses] = useState([]);
  const corp = {corp: true}
  const searchRef = useRef();
  const subjectRef = useRef();
  const ratingRef = useRef();
  
  const searchCourses = async () => {
    const query = searchRef.current.value;
    const subject = subjectRef.current.value;
    const rating = ratingRef.current.value;

    const params = { query, subject, rating}
    const response = await axios.get(APIURL + '/courses', { params })
    const data = response.data;
    console.log(data); //testing purposes
    setCourses(data);
  }
 
 
  useEffect(() => {
    searchCourses();
  },[])

  return (
    <div className="m-3">
        <input className="m-1" ref={searchRef} placeholder="Search" type="search"/>
        <button onClick={searchCourses}>Search</button>
        <input className="m-2" ref={subjectRef} placeholder="Subject" type="text"/>
        <input className="m-1" ref={ratingRef} placeholder="Rating" type="number" min="1" max="5"/><br/><br/>
        
        
      <h2>Search Results:</h2>
      <hr></hr>
      {
        courses?.length > 0 ? (
          <div>
            <CoursesList courses = {courses} corp = {corp}/>
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

export default CorpCourses;