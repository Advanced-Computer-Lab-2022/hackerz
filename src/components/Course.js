import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Course(props) {
  const course = props.course;
  const corp = props.corp;
  const link = "/courses/" + course._id;
  return (
      <Card style={{width:"20%"}}  
      className="m-1">
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">by {course.instructorUsername} </Card.Subtitle>
        <Card.Text>{course.description}</Card.Text>
        <Card.Link href={link}>View Course</Card.Link>
        {!corp.corp ?
         <Card.Footer className="text-muted">{
            course.price ? (course.price === 0 ?
              <span style={{color: "red"}}>FREE</span> 
              : <>for ${course.price}</>):<></>}</Card.Footer>:<></>}
        
      </Card.Body>
    </Card>
  )
}
