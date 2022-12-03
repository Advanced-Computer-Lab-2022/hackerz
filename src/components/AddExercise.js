import React, {useRef} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function AddExercise() {
  return (
    <Card className="mt-4 w-50 mx-auto my-4">
      <Card.Header><strong>Add Course Form</strong></Card.Header>
      <Card.Body>
      <FloatingLabel
        controlId="floatingTitle"
        label="Title"
        className="mb-3"
      >
        <Form.Control type="title" placeholder="Title" />
      </FloatingLabel>
      
      
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle1" label="Question 1" className="mb-3">
            <Form.Control type="subject" placeholder="Question 1" />
        </FloatingLabel>
        </Col>
        <div className="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle1Duration" label="DropDown Menu here TEST" className="mb-3">
            <Form.Control type="Subtitle1Duration" placeholder="Subtitle1Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 1" className="mb-3">
        <Form.Control
        //   ref={subtitle1DescriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 2" className="mb-3">
        <Form.Control
        //   ref={subtitle1DescriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 3" className="mb-3">
        <Form.Control
        //   ref={subtitle1DescriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 4" className="mb-3">
        <Form.Control
        //   ref={subtitle1DescriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <hr></hr>
      </Card.Body>
      <Row><Button  className="w-25 mx-auto mb-3" variant="primary">Add Question</Button>
      <Button  className="w-25 mx-auto mb-3" variant="danger">Create Exercise</Button></Row>
    </Card>
  )
}
