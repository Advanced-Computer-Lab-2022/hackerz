import React, {useRef} from 'react'
import { useNavigate } from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
const axios = require('axios').default;
const APIURL = "http://localhost:5000"; //change to 5000

export default function AddCourse({user}) {
    const titleRef = useRef();
    const subjectRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const subtitle1TitleRef = useRef();
    const subtitle1DurationRef = useRef();
    const subtitle1DescriptionRef = useRef();
    const subtitle2TitleRef = useRef();
    const subtitle2DurationRef = useRef();
    const subtitle2DescriptionRef = useRef();
    const subtitle3TitleRef = useRef();
    const subtitle3DurationRef = useRef();
    const subtitle3DescriptionRef = useRef();
  
    const addCourse = async () => {
        const title = titleRef.current.value;
        const subject = subjectRef.current.value;
        const price = Number(priceRef.current.value);
        const description = descriptionRef.current.value;
        const subtitle1Title = subtitle1TitleRef.current.value;
        const subtitle2Title = subtitle2TitleRef.current.value;
        const subtitle3Title = subtitle3TitleRef.current.value;
        const subtitle1Duration= Number(subtitle1DurationRef.current.value);
        const subtitle2Duration= Number(subtitle2DurationRef.current.value);
        const subtitle3Duration= Number(subtitle3DurationRef.current.value);
        const subtitle1Description= subtitle1DescriptionRef.current.value;
        const subtitle2Description= subtitle2DescriptionRef.current.value;
        const subtitle3Description= subtitle3DescriptionRef.current.value;

        const data = {title, description, subject, price,
            subtitles:[
                {title: subtitle1Title, description: subtitle1Description, duration: subtitle1Duration },
                {title: subtitle2Title, description: subtitle2Description, duration: subtitle2Duration },
                {title: subtitle3Title, description: subtitle3Description, duration: subtitle3Duration }
            ]};
        const link = APIURL + '/instructor/' + user.username + "/add-course";
        await axios.post(link, data);
        titleRef.current.value = "";
        subjectRef.current.value = "";
        priceRef.current.value = "";
        descriptionRef.current.value = "";
        subtitle1TitleRef.current.value = "";
        subtitle2TitleRef.current.value = "";
        subtitle3TitleRef.current.value = "";
        subtitle1DurationRef.current.value = "";
        subtitle2DurationRef.current.value = "";
        subtitle3DurationRef.current.value = "";
        subtitle1DescriptionRef.current.value = "";
        subtitle2DescriptionRef.current.value = "";
        subtitle3DescriptionRef.current.value = "";
        alert("Course Added")
    }

    return (
    <Card className="mt-4 w-50 mx-auto my-4">
      <Card.Header><strong>Add Course Form</strong></Card.Header>
      <Card.Body>
      <FloatingLabel
        controlId="floatingTitle"
        label="Title"
        className="mb-3"
      >
        <Form.Control ref={titleRef} type="title" placeholder="Title" />
      </FloatingLabel>
      <div className="form-row">
      <Row className="g-3">
      <Col>
      <FloatingLabel controlId="floatingSubject" label="Subject" className="mb-3">
        <Form.Control ref={subjectRef} type="subject" placeholder="Subject" />
      </FloatingLabel>
      </Col>
      <div className="h-100 col-md-4">
      <Col>
      <InputGroup className="h-100">
        <InputGroup.Text>EGP</InputGroup.Text>
        <Form.Control ref={priceRef} aria-label="Amount (to the nearest dollar)" placeholder="Price" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
      </Col>
      </div>
      </Row>
      </div>
      <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
        <Form.Control
          ref={descriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle1" label="Subtitle 1" className="mb-3">
            <Form.Control ref={subtitle1TitleRef} type="subject" placeholder="Subtitle 1" />
        </FloatingLabel>
        </Col>
        <div className="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle1Duration" label="Duration in Hours" className="mb-3">
            <Form.Control ref={subtitle1DurationRef} type="Subtitle1Duration" placeholder="Subtitle1Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea3" label="Subtitle 1 Description" className="mb-3">
        <Form.Control
          ref={subtitle1DescriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle2" label="Subtitle 2" className="mb-3">
            <Form.Control ref={subtitle2TitleRef} type="subject" placeholder="Subtitle 2" />
        </FloatingLabel>
        </Col>
        <div className="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle2Duration" label="Duration in Hours" className="mb-3">
            <Form.Control ref={subtitle2DurationRef} type="Subtitle2Duration" placeholder="Subtitle2Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea4" label="Subtitle 2 Description" className="mb-3">
        <Form.Control
          ref={subtitle2DescriptionRef}
          as="textarea"
          placeholder="Describe your subtitle here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle3" label="Subtitle 3" className="mb-3">
            <Form.Control ref={subtitle3TitleRef} type="subject" placeholder="Subtitle 3" />
        </FloatingLabel>
        </Col>
        <div className="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle3Duration" label="Duration in Hours" className="mb-3">
            <Form.Control ref={subtitle3DurationRef} type="Subtitle3Duration" placeholder="Subtitle3Duration" />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea5" label="Subtitle 3 Description" className="mb-3">
        <Form.Control
          ref={subtitle3DescriptionRef}
          as="textarea"
          placeholder="Describe your subtitle here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      </Card.Body>
      <Button onClick={addCourse} className="w-25 mx-auto mb-3" variant="primary">Add Course</Button>
    </Card>
  )
}
