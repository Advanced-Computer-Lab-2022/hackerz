import React from 'react'
import Course from './Course'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function CoursesList({courses}) {

    return (
        <div>
        <Row className="d-flex">
        <Col className="d-flex">
        { courses.map(course => {
            return <Course key={course._id} course={course}/>
        }) }
            </Col>
        </Row>
        </div>
        
  )
}
