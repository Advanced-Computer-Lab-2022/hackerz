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

export default function Subtitle(props) {
    const [subtitle, setSubtitle] = useState([]);
    const [enrolled, setEnrolled] = useState(false);
    const [completed, setCompleted] = useState(false);
    const user = props.user;
    let {id, subtitleID} = useParams();
    const notesRef = useRef();

    const completeRequest = async () => {
      const response = await axios.post(APIURL + '/trainee/' + user.username + '/' + subtitleID + '/complete')
      setCompleted(true)
    }
    const checkComplete = async () => {
      const response = await axios.get(APIURL + '/trainee/' + user.username + '/' + subtitleID + '/isCompleted')
      setCompleted(response.data)
      console.log("isCompleted?", response.data)
    }

    const checkEnrolled = async () => {
      if(user.username.length > 0){
        const response = await axios.get(APIURL + '/trainee/' + user.username +'/' + id + '/isEnrolled')
        const data = response.data;
        setEnrolled(data);
    } else {
        setEnrolled(false); 
      }
    }

    const fetchSubtitle = async () => {
        const response = await axios.get(APIURL + '/courses/' + id + '/' + subtitleID + '/get-subtitle')
        const data = response.data;
        console.log(data); //testing purposes
        setSubtitle(data);
    } 
    const downloadNotes = async () => {
      const element = document.createElement("a");
      const file = new Blob([document.getElementById('input').value],{type:'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = "myNotes.txt";
      document.body.appendChild(element);
      element.click();
      console.log(notesRef.current.value); //testing purposes
    } 
    useEffect(() => {
      checkEnrolled(); 
      checkComplete();
      fetchSubtitle(); // eslint-disable-next-line
      },[])

      useEffect(() => {
        checkEnrolled();  // eslint-disable-next-line
    },[user])
  
    return (
      <Card className="mt-4 w-50 mx-auto mb-5">
      <Card.Header><h2><strong>{subtitle.title}</strong></h2></Card.Header>
      { enrolled ? 
      <Card.Body>
      <div style={{float: 'right'}}>
      {completed?
        <Button className="m-1" variant="success" disabled>Completed</Button>
         : <Button className="m-1" variant="outline-danger" onClick={completeRequest}>Mark As Complete</Button> }</div>
        <Card.Title>{subtitle.description}</Card.Title><br/>
        {subtitle.videoURL ? <ReactPlayer className="m-auto" url={subtitle.videoURL} controls={true}/>: <></>}
        <br/>
        Video Description: {subtitle.videoDescription}
        <hr/>
        <FloatingLabel controlId="input" label="Take your notes here" className="mb-3 w-75 mx-auto">
          <Form.Control
            ref={notesRef}
            as="textarea"
            placeholder="Describe your course here"
            style={{ height: '200px' }}
          />
          <Button onClick={downloadNotes} className="w-25 mx-auto my-3" variant="primary">Download Notes</Button>
        </FloatingLabel>
      </Card.Body> 
      : <h1>UNAUTHORIZED ACCESS</h1> }
      </Card>
  )
}
