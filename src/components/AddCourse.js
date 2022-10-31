import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

export default function AddCourse({user}) {
  return (
    <Card className="mt-4 w-50 mx-auto">
      <Card.Header><strong>Add Course Form</strong></Card.Header>
      <Card.Body>
      <FloatingLabel
        controlId="floatingTitle"
        label="Title"
        className="mb-3"
      >
        <Form.Control type="title" placeholder="Title" />
      </FloatingLabel>
      <div class="form-row">
      <Row className="g-3">
      <Col>
      <FloatingLabel controlId="floatingSubject" label="Subject" className="mb-3">
        <Form.Control type="subject" placeholder="Subject" />
      </FloatingLabel>
      </Col>
      <div class="h-100 col-md-4">
      <Col>
      <InputGroup className="h-100">
        <InputGroup.Text>EGP</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" placeholder="Price" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
      </Col>
      </div>
      </Row>
      </div>
      <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle1" label="Subtitle 1" className="mb-3">
            <Form.Control type="subject" placeholder="Subtitle 1" />
        </FloatingLabel>
        </Col>
        <div class="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle1Duration" label="Duration in Hours" className="mb-3">
            <Form.Control type="Subtitle1Duration" placeholder="Subtitle1Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea3" label="Subtitle 1 Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle2" label="Subtitle 2" className="mb-3">
            <Form.Control type="subject" placeholder="Subtitle 2" />
        </FloatingLabel>
        </Col>
        <div class="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle2Duration" label="Duration in Hours" className="mb-3">
            <Form.Control type="Subtitle2Duration" placeholder="Subtitle2Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea4" label="Subtitle 2 Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Describe your subtitle here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle3" label="Subtitle 3" className="mb-3">
            <Form.Control type="subject" placeholder="Subtitle 3" />
        </FloatingLabel>
        </Col>
        <div class="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle3Duration" label="Duration in Hours" className="mb-3">
            <Form.Control type="Subtitle3Duration" placeholder="Subtitle3Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea5" label="Subtitle 3 Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Describe your subtitle here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      </Card.Body>
      <Button className="w-25 mx-auto mb-3" variant="primary">Add Course</Button>
    </Card>
  )
}
