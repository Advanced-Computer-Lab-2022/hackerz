import React, {useEffect, useState} from 'react';
import { useParams, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function CreditCardInfo() {
    const [course, setCourse] = useState([]);
    let {id} = useParams();
    const fetchCourse = async () => {
        const response = await axios.get(APIURL + '/courses/' + id)
        const data = response.data;
        console.log(data); //testing purposes
        setCourse(data);
    }

    const payCourse = async () => {
        alert("Course has been paid for successfully!")
    }
    useEffect(() => {
          fetchCourse(); // eslint-disable-next-line
      },[])
    return (
    <Card className="mt-4 w-50 mx-auto my-4">
    <Card.Header><h2>Payment Info</h2></Card.Header>
    <Form className="m-3">
      <Row>
        <Form.Group as={Col} controlId="creditcardNo">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control type="email" placeholder="**** **** **** ****" />
        </Form.Group>

        <Form.Group as={Col} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="password" placeholder="YOUR NAME HERE" />
        </Form.Group>
      </Row><br/>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="valid">
          <Form.Label>Valid Thru</Form.Label>
          <Form.Control placeholder="MM/YY"/>
        </Form.Group>

        <Form.Group as={Col} controlId="cvc">
          <Form.Label>CVC</Form.Label>
          <Form.Control type="password" placeholder="***"/>
        </Form.Group>
      </Row>
      <hr/>
      <div><h4>$<strong>{course.price}</strong> will be deducted from your credit card <strong>monthly</strong>.</h4></div>
      <hr/>
      <Button onClick={payCourse} className="w-25 mx-auto" variant="danger">Pay for Course</Button>
    </Form>
    </Card>
  )
}
