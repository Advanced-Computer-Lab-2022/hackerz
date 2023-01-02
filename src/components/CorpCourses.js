import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function CorpCourses() {
  const [courses, setCourses] = useState([]);
  const [popular, setPopular] = React.useState(false);
  const corp = {corp: true}
  const searchRef = useRef();
  const subjectRef = useRef();
  const ratingRef = useRef();

  const handlePopular = () => {
    setPopular(!popular);
  };
  
  const searchCourses = async () => {
    const query = searchRef.current.value;
    const subject = subjectRef.current.value;
    const rating = ratingRef.current.value;

    const params = { query, subject, rating, popular}
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
        <div className="mx-1"><input checked={popular} onChange={handlePopular} type="checkbox" /> Sort by most popular</div><br/>
        <input className="m-2" ref={subjectRef} placeholder="Subject" type="text"/>
        <input className="m-1 rat" ref={ratingRef} placeholder="Rating" type="number" min="1" max="5"/><br/><br/>
        
        
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