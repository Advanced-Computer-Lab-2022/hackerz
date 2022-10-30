import React from 'react'
import Course from './Course'
import {Row} from 'react-bootstrap';  



export default function CoursesList({courses}) {
    return (
        <div>  
        <Row className="d-flex">
        { courses.map(course => {
            return <Course key={course._id} course={course}/>
        }) } 
        </Row>
        </div>
        
  )
}
