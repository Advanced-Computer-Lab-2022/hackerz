import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './components/CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

function App() {
  const [courses, setCourses] = useState([]);
  const searchRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const subjectRef = useRef();
  const ratingRef = useRef();
  
  const searchCourses = async () => {
    const query = searchRef.current.value;
    const minPrice = minPriceRef.current.value;
    const maxPrice = maxPriceRef.current.value;
    const subject = subjectRef.current.value;
    const rating = ratingRef.current.value;

    const params = { query, minPrice, maxPrice, subject, rating}
    
    const response = await axios.get(APIURL + '/courses',
     { params })
    const data = response.data;
    console.log(data); //testing purposes
    setCourses(data);
  }
 
 
  useEffect(() => {
    searchCourses();
  },[])

  return (
    <div>
      
        <input ref={searchRef} placeholder="Search" type="search"/>
        <button onClick={searchCourses}>Search</button> <br/>
        <input ref={minPriceRef} placeholder="Minimum Price" type="number"/>
        <input ref={maxPriceRef} placeholder="Maxmimum Price" type="number"/>
        <br/><input ref={subjectRef} placeholder="Subject" type="text"/>
        <input ref={ratingRef} placeholder="Rating" type="number" min="1" max="5"/>
        
        
      <h1>Search Results:</h1>
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

export default App;
