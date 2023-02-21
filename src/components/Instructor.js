import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
axios.defaults.withCredentials = true;
const APIURL = 'http://localhost:5000';

export default function Instructor(props) {
  const instructor = props.instructor;
  const link = "/instructor/" + instructor.username + "/my-courses";
  var crnt_rating = instructor.rating ? instructor.rating : 0;
  const [rating, setRating] = useState(crnt_rating);


  const updateRating = async (newRating) => {
    console.log(newRating)
    await axios.put(APIURL + '/instructor/' + instructor.username, null, { params: { rating: newRating } })
    crnt_rating = instructor.rating ? newRating ? newRating : instructor.rating : 0;
    setRating(crnt_rating);
  }

  

  useEffect(() => {
    updateRating();
  }, [])

  return (
    <Card style={{ width: "18%" }} className="m-3">
      <Card.Body>
        <Card.Title>{instructor.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">(Rating: { rating }/5)</Card.Subtitle>
        <Card.Text>{instructor.country}</Card.Text>
        <NavLink to={link}>View Courses</NavLink>
        <Card.Text>Rating: <ReactStars count={5} onChange={updateRating} size={24} emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" /></Card.Text>
      </Card.Body>
    </Card>
  )
}
