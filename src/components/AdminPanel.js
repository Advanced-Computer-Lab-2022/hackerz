import React, {useRef, useState, useEffect} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
export default function AdminPanel() {
  

    const instructorUsernameRef = useRef();
    const instructorPasswordRef = useRef();
    const corpUsernameRef = useRef();
    const corpPasswordRef = useRef();
    const [requests, setRequests] = useState([]);

    const addInstructor = async () => {
        const username = instructorUsernameRef.current.value;
        const password = instructorPasswordRef.current.value;
        const data = {username, password}
        const link = APIURL + '/admin/addinst';
        await axios.post(link, data,{  withCredentials: true,credentials: "include"});
        instructorUsernameRef.current.value = "";
        instructorPasswordRef.current.value = "";
        alert("Instructor Added")
    }
    const addCorporateTrainee = async () => {
        const username = corpUsernameRef.current.value;
        const password = corpPasswordRef.current.value;
        const data = {username, password}
        const link = APIURL + '/admin/addcorp';
        await axios.post(link, data,{  withCredentials: true,credentials: "include"});
        corpUsernameRef.current.value = "";
        corpPasswordRef.current.value = "";
        alert("Corporate Trainee Added")
    }

    const addAdmin = async () => {
        const response = await axios.post(APIURL + '/admin/addadmin',{  withCredentials: true,credentials: "include"}); 
        const username = response.data.username;
        const password = response.data.password;
        alert("New Admin added with username: " + username + " and password: " + password)}

    const fetchRequests = async () => {
            const response = await axios.get(APIURL + '/admin/corp-requests')
            const data = response.data;
            console.log(data); //testing purposes
            setRequests(data);
    }

    const acceptRequest = async (reqID) => {
        await axios.post(APIURL + '/admin/' + reqID + '/accept')
        fetchRequests();
        alert("Request Accepted");
    }
    const rejectRequest = async (reqID) => {
        await axios.post(APIURL + '/admin/' + reqID + '/reject')
        fetchRequests();
        alert("Request Rejected");
    }

    useEffect(() => {
        fetchRequests(); // eslint-disable-next-line
      },[])
    

    return (
    <>
    <Card className="mt-4 w-50 mx-auto">
        <Card.Header><strong>Add Instructor</strong></Card.Header>
        <Card.Body>
            <Row>
                <Col>
                <FloatingLabel controlId="floatingInstUsername" label="Instructor Username">
                    <Form.Control ref={instructorUsernameRef} type="username" placeholder="Username" />
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingInstPassword" label="Instructor Password">
                    <Form.Control ref={instructorPasswordRef} type="pass" placeholder="Password" />
                </FloatingLabel>
                </Col>
            </Row>
        </Card.Body>
        <Button onClick={addInstructor} className="w-25 mx-auto mb-3" variant="primary">Add Instructor</Button>
    </Card>
    <Card className="mt-4 w-50 mx-auto">
        <Card.Header><strong>Add Corporate Trainee</strong></Card.Header>
        <Card.Body>
            <Row>
                <Col>
                <FloatingLabel controlId="floatingTraineeUsername" label="Trainee Username">
                    <Form.Control ref={corpUsernameRef} type="username" placeholder="Username" />
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTraineePassword" label="Trainee Password">
                    <Form.Control ref={corpPasswordRef} type="pass" placeholder="Password" />
                </FloatingLabel>
                </Col>
            </Row>
        </Card.Body>
        <Button onClick={addCorporateTrainee} className="w-25 mx-auto mb-3" variant="primary">Add Corp. Trainee</Button>
    </Card>
    <Card className="mt-4 w-50 mx-auto">
        <Button onClick={addAdmin} className="w-25 mx-auto my-3" variant="danger">Add Admin</Button>
    </Card>
    <Card className="mt-4 w-50 mx-auto">
        <Card.Header><strong>Corporate Course Requests</strong></Card.Header>
        <Table striped bordered hover className='w-75 mx-auto m-4'>
        <thead>
        <tr>
          <th>Corporate User</th>
          <th>Course Name</th>
          <th></th><th></th>
        </tr>
      </thead>
        <tbody>
            { requests.map(request => {
                return (
                <tr>
                    <td>{request.corpUser}</td>
                    <td>{request?.courseName}</td>
                    <td><Button onClick={() => acceptRequest(request._id)}
                         className="mx-auto" variant="primary">Accept</Button></td>
                    <td><Button onClick={() => rejectRequest(request._id)}
                         className="mx-auto" variant="danger">Reject</Button></td>
                </tr>
        )}) }
        </tbody>
        </Table>
    </Card>
    </>
  )
  
      
            
        
    
  
}
