import React, {useEffect, useState} from 'react';
import { Route, useParams } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
//import { Link } from 'react-router-dom';
//import Report from './components/Report';


export default function CourseView(props) {
    const [course, setCourse] = useState([]);
    let {id} = useParams();
    const fetchCourse = async () => {
        const response = await axios.get(APIURL + '/courses/' + id)
        const data = response.data;
       // const link = "/course/" + course._id;

        console.log(data); //testing purposes
        setCourse(data);
    }
    useEffect(() => {
        fetchCourse(); // eslint-disable-next-line
    },[])

    return (
    <Card className="mt-4 w-50 mx-auto">
      <Card.Header>
        <strong>{course.title} by {course.instructorUsername}</strong>
        <Button style={{float: 'right'}} className="w-15 mx-auto mb-3" variant="primary">Report</Button>
        <Route
        path = "/instructor/my-courses/report"
        //element ={<Report/>}
        />
         {/* <Link to={link}>Report</Link>  */}
        {/* <button onclick="window.location.href='b.php'">Report</button> */}
      </Card.Header>
      
      <Card.Body>
        <Card.Title>{course.description}</Card.Title><br/>
        {
        course.subtitles?.length > 0 ?
        <Card.Text>Subtitles: </Card.Text>:<></>}
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
      </Card.Body>
      <Button className="w-25 mx-auto mb-3" variant="primary">Enroll in Course</Button>
    </Card>
  )
}
