import React, { useState, useEffect } from 'react';
import { useParams , NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
export default function ExerciseList({user}) {
  //use params for course id
  let {id} = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
 
    const fetchExercises = async () => {
        const response = await axios.get(APIURL + '/courses/' + id + '/get-exercises')
        const data = response.data;
        console.log(data);
        setExercises(data);
        setLoading(false);
    }

    useEffect(() => {
      fetchExercises(); // eslint-disable-next-line
    },[])

    //useeffect to load questions
  return (
    <div>{ loading ? <>LOADING</> :<>
        <Card className="mt-4 w-50 mx-auto">
          <Card.Header><h2><strong>Course Exercises</strong></h2></Card.Header>
          <Card.Body>
            <br/>
            <ListGroup as="ol" numbered>
            {
            exercises?.length > 0 ? (
              <div>
                {exercises.map(exercise => {
                  return <ListGroup.Item
                  as="li" className="d-flex justify-content-between align-items-start">
                  <h4><div className="fw-bold m-1">{exercise.title}<Badge className="ms-3" bg="secondary"> Grade: 2/10 </Badge>
                  </div></h4>
                  <div className="position-absolute end-0">
                  <Button style={{float: 'right'}} className="me-3" variant="success">
                  <NavLink to={""} style={{color: 'white'}}>View Solution</NavLink></Button>
                  <Button style={{float: 'right'}} className="me-3" variant="primary">
                  <NavLink to={"/exercise/" + exercise.id} style={{color: 'white'}}>Take Exercise</NavLink></Button>
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
      </>
        }</div>
  )
}
