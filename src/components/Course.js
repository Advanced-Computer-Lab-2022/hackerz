import React from 'react'
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import countries from '../countries.json';
import { my_country } from './Country';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Course(props) {
  let navigate = useNavigate();
  const course = props.course;
  const corp = props.corp;
  const link = "/course/" + course._id;
  const reportNavigate = () => {
    return navigate('/report');
  }
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
              : <>for {countries[my_country].currency} {course.price}</>):<></>}</Card.Footer>:<></>}
      </Card.Body>
      <Button onClick={reportNavigate} style={{backgroundColor: 'red'}} className="w-15 mx-auto mb-3" variant="primary"
      courseid={course._id}>Report</Button>
    </Card>
  )
}
