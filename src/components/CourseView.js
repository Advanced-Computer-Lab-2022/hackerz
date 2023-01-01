import React, {useRef, useEffect, useState} from 'react';
import { useParams, NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactStars from 'react-rating-stars-component';
import ReactPlayer from "react-player";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function CourseView({user}) {
  const reviewRef = useRef();
    const [course, setCourse] = useState([]);
    const [enrolled, setEnrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    let {id} = useParams();
    const fetchCourse = async () => {
        const response = await axios.get(APIURL + '/courses/' + id)
        const data = response.data;
        console.log(data); //testing purposes
        setCourse(data);
    }
    const checkEnrolled = async () => {
      if(user){const response = await axios.get(APIURL + '/trainee/' + user.username +'/' + id + '/isEnrolled')
      const data = response.data;
      setEnrolled(data);}
    }
    const enrollCourse = async () => {
      await axios.post(APIURL + '/trainee/' + user.username +'/' + id + '/enroll')
      setEnrolled(true);
    }
    const requestAccess = async () => {
      const response = await axios.post(APIURL + '/corp/' + user.username +'/' + id + '/requestAccess')
      alert(response.data)
    }
    const addReview = async () => {
      const response = await axios.post(APIURL + '/trainee/' + user.username +'/' + id + '/add-review', {review: reviewRef.current.value})
      fetchCourse();
      alert(response.data)
      reviewRef.current.value = "";
    }
    
    const fetchProgress = async () => {
      const response = await axios.get(APIURL + '/trainee/' + user.username +'/' + id + '/progress')
      setProgress(Number(response.data))
      console.log("progress:", response.data)
    }
    
    useEffect(() => {
      checkEnrolled();
      fetchCourse(); // eslint-disable-next-line
  
    },[])

    useEffect(() => {
      checkEnrolled();
      fetchProgress();
    },[user])
    
    useEffect(() => {
      fetchProgress();;  // eslint-disable-next-line
  },[enrolled])

  const updateRating = async (newRating) => {
    console.log(newRating)
    await axios.put(APIURL + '/courses/' + id, null, { params: { rating:newRating }})
  }

    return (
    <Card className="mt-4 mb-5 w-50 mx-auto">
      <Card.Header><h2><strong>{course.title}</strong></h2> <h4> by {course.instructorUsername}</h4>
      <div style={{float: 'right'}}> {enrolled && user.username.length > 0? <h3>Progress Made: {progress}%</h3> :<></>}</div></Card.Header>
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
        <br/><br/><br/>
        {course.previewURL? <ReactPlayer className="m-auto" url={course.previewURL} controls={true}/>: <></>}
        {
          course.subtitles?.length > 0 ?
            <Card.Text><br/>Subtitles:  </Card.Text> : <></>}
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
                            
              {enrolled || user.username === course.instructorUsername ? <NavLink to={subtitle._id} className="m-3">
                <Button variant="outline-primary">View Subtitle</Button>
              </NavLink> : <></>}
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
    <br/>
  { enrolled ?
    <Card.Text>Rating: <ReactStars count={5} onChange={updateRating} size={24} emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" /></Card.Text>:<></>}
     {user.username.length === 0 || user.username === course.instructorUsername ? <></> :( enrolled ? <Button className="w-25 mx-auto mb-3" variant="success" disabled>Enrolled</Button> 
      : (user.userType === "corpTrainee"? 
      <Button className="w-25 mx-auto mb-3" variant="primary" onClick={requestAccess}>Request Access</Button> 
      : <NavLink to={"checkout"}><Button className="w-25 mx-auto mb-3" variant="primary" onClick={enrollCourse}>Enroll in Course</Button>
      </NavLink>) )} 
      { enrolled && user.userType === "individualTrainee" && progress < 50 ? <Button onClick={() => alert("Course refunded!")}className="w-25 mx-auto mb-3" variant="danger">Refund Course</Button> : <></>}
      <ListGroup as="ol" numbered>
        <hr/>
        
        {enrolled? <FloatingLabel controlId="input" label="Write your review here" className="w-75 mx-auto">
          <Form.Control
            ref={reviewRef}
            as="textarea"
            placeholder="Write your review here"
            style={{ height: '100px' }}
          />
          <Button onClick={addReview} className="w-25 mx-auto mt-2" variant="primary">Add review</Button>
        </FloatingLabel> : <></>}
        <hr/>
        {
          course.reviews?.length > 0 ?
          <h3>Reviews:</h3> : <></>}
        {
          course.reviews?.length > 0 ? (
            <div>
            {course.reviews.map(review => {
              return <ListGroup.Item
              as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
              <div className="fw-bold">{review.username}</div>
                {review.review}
              </div>
            </ListGroup.Item>
          })}
            </div>
          ) : (
            <div>
            </div>
          )}
    </ListGroup>
          </Card.Body>
    </Card>
  )
}
