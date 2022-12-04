import React, {useEffect, useState} from 'react';
import { useParams, NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactStars from 'react-rating-stars-component';

const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function CourseView({user}) {
    const [course, setCourse] = useState([]);
    const [enrolled, setEnrolled] = useState(false);
    let {id} = useParams();
    const fetchCourse = async () => {
        const response = await axios.get(APIURL + '/courses/' + id)
        const data = response.data;
        console.log(data); //testing purposes
        setCourse(data);
    }
    const checkEnrolled = async () => {
      const response = await axios.get(APIURL + '/trainee/' + user.username +'/' + id + '/isEnrolled')
      const data = response.data;
      setEnrolled(data);
    }
    const enrollCourse = async () => {
      await axios.post(APIURL + '/trainee/' + user.username +'/' + id + '/enroll')
      setEnrolled(true);
    }
    useEffect(() => {
      checkEnrolled();
        fetchCourse(); // eslint-disable-next-line
    },[])

    useEffect(() => {
      checkEnrolled();  // eslint-disable-next-line
  },[user])

  const updateRating = async (newRating) => {
    console.log(newRating)
    await axios.put(APIURL + '/courses/' + id, null, { params: { rating:newRating }})
  }

    return (
    <Card className="mt-4 w-50 mx-auto">
      <Card.Header><h2><strong>{course.title} by {course.instructorUsername}</strong></h2></Card.Header>
      <Card.Body>
      <div style={{float: 'right'}}>
        { enrolled || user.username === course.instructorUsername ? 
        <NavLink to={"exercises"} className="mb-2">
          <Button variant="outline-primary">View Exercises</Button>
        </NavLink> : <></>}
        
        { user.username === course.instructorUsername ? 
        <NavLink to={"add-exercise"}>
          <Button variant="outline-danger">Add New Exercise</Button>
        </NavLink> : <></>}
        </div>
        <Card.Title>{course.description}</Card.Title>
        <br /><br/>
        {
          course.subtitles?.length > 0 ?
            <Card.Text>Subtitles: </Card.Text> : <></>}
        <ListGroup as="ol" numbered>
        {
        course.subtitles?.length > 0 ? (
          <div>
            {course.subtitles.map(subtitle => {
              return <ListGroup.Item
              as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
              <div className="fw-bold">{subtitle.title}</div>
                {subtitle.description}
              </div>
              <Badge bg="primary" pill>
                {subtitle.duration} hours
              </Badge>
            </ListGroup.Item>
          })}
            </div>
          ) : (
            <div>
            </div>
          )}
    </ListGroup>
    <Card.Text>Rating: <ReactStars count={5} onChange={updateRating} size={24} emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" /></Card.Text>
      </Card.Body>
      {enrolled ? <Button className="w-25 mx-auto mb-3" variant="success" disabled>Enrolled</Button> 
      : <Button className="w-25 mx-auto mb-3" variant="primary" onClick={enrollCourse}>Enroll in Course</Button> }
    </Card>
  )
}
