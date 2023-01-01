import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
import { my_country } from './Country';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

function Search() {
  const [courses, setCourses] = useState([]);
  const [popular, setPopular] = React.useState(false);
  const searchRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const subjectRef = useRef();
  const ratingRef = useRef();

  const handlePopular = () => {
    setPopular(!popular);
  };
  
  const searchCourses = async () => {
    const query = searchRef.current.value;
    const minPrice = minPriceRef.current.value;
    const maxPrice = maxPriceRef.current.value;
    const subject = subjectRef.current.value;
    const rating = ratingRef.current.value;
    const country = my_country;
    const params = { query, minPrice, maxPrice, subject, rating, country, popular }
    console.log(popular)
    const response = await axios.get(APIURL + '/courses', { params })
    const data = response.data;
    
    setCourses(data);
  }
 
 
  useEffect(() => {
    searchCourses();
  },[])

  return (
    <div className="m-3">
        <input className="m-1" ref={searchRef} placeholder="Search" type="search"/>
        <button onClick={searchCourses}>Search</button> &nbsp;&nbsp;
        <div className="mx-1"><input checked={popular} onChange={handlePopular} type="checkbox" /> Sort by most popular</div><br/>
        <input className="m-1" ref={minPriceRef} placeholder="Minimum Price" type="number"/>
        <input className="m-1" ref={maxPriceRef} placeholder="Maxmimum Price" type="number"/>
        <input className="m-1" ref={subjectRef} placeholder="Subject" type="text"/>
        <input className="m-1 rat" ref={ratingRef} placeholder="Rating" type="number" min="1" max="5"/><br/><br/>
        
        
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

export default Search;