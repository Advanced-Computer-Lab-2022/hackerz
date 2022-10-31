import React from 'react'
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

export default function Course(props) {
  const course = props.course;
  const corp = props.corp;
  const link = "/course/" + course._id;
  return (
    <Card style={{width:"18%"}} className="m-3">
      <Card.Body>
        <Card.Title>{course.subject}: {course.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">by {course.instructorUsername} (Rating: {course.rating? course.rating : 0}/5)</Card.Subtitle>
        <Card.Text>{course.description}</Card.Text>
        <NavLink to={link}>View Course</NavLink>
        {!corp.corp ?
         <Card.Footer className="text-muted">{
            course.price ? (course.price === 0 ?
              <span style={{color: "red"}}>FREE</span> 
              : <>for ${course.price}</>):<></>}</Card.Footer>:<></>}
      </Card.Body>
    </Card>
  )
}
