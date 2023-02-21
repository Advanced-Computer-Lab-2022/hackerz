import React, {useEffect, useState} from 'react'
import CoursesList from './CoursesList'
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function MyCourses({user}) {
    const username = user.username;
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        const response = await axios.get(APIURL + '/trainee/' + username + '/myCourses')
        const data = response.data;
        setCourses(data);
      }
      useEffect(() => {
        fetchCourses();
      },[])
    
    return (
    <div>
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
    )
}
