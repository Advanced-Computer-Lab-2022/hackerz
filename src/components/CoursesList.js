import React from 'react'
import Course from './Course'
import {Row} from 'react-bootstrap';  



export default function CoursesList(props) {
    const courses = props.courses;
    const corp = props.corp ? props.corp : false;
    
    return (
        <div>  
        <Row className="d-flex mx-auto">
        { courses.map(course => {
            return <Course key={course._id} course={course} corp={corp}/>
        }) } 
        </Row>
        </div>
        
  )
}
