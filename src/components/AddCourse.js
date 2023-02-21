import React, {useRef, useState, useEffect} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
export default function AddCourse({user}) {
    const titleRef = useRef();
    const subjectRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const subtitle1TitleRef = useRef();
    const subtitle1DurationRef = useRef();
    const subtitle1DescriptionRef = useRef();
    const previewRef = useRef();
    const subtitleVidRef = useRef();
    const subtitleVidDescRef = useRef();
    const [subtitles, setSubtitles] = useState([]);
    var subtitlesCount = "";

    const addSubtitle = () => {
      const subtitle1Title = subtitle1TitleRef.current.value;
      const subtitle1Duration= Number(subtitle1DurationRef.current.value);
      const subtitle1Description= subtitle1DescriptionRef.current.value;
      const videoURL = subtitleVidRef.current.value;
      const videoDescription = subtitleVidDescRef.current.value;
      const subtitle = {title: subtitle1Title ,description: subtitle1Description ,duration: subtitle1Duration, videoURL, videoDescription}
      setSubtitles(subtitles.concat(subtitle))
      subtitle1TitleRef.current.value = "";
      subtitle1DurationRef.current.value = "";
      subtitle1DescriptionRef.current.value = "";
      subtitleVidRef.current.value = "";
      subtitleVidDescRef.current.value = "";
      console.log(subtitles);
    }

    const addCourse = async () => {
        const title = titleRef.current.value;
        const subject = subjectRef.current.value;
        const price = Number(priceRef.current.value);
        const description = descriptionRef.current.value;
        const previewURL = previewRef.current.value;
        const data = {title, description, subject, price, subtitles, previewURL};
        const link = APIURL + '/instructor/' + user.username + "/add-course";
        await axios.post(link, data);
        titleRef.current.value = "";
        subjectRef.current.value = "";
        priceRef.current.value = "";
        descriptionRef.current.value = "";
        previewRef.current.value = "";
        subtitle1TitleRef.current.value = "";
        subtitle1DurationRef.current.value = "";
        subtitle1DescriptionRef.current.value = "";
        subtitleVidRef.current.value = "";
        subtitleVidDescRef.current.value = "";
       
        alert("Course Added")
    }
      subtitlesCount = "Subtitle " + Number(subtitles.length + 1);  // eslint-disable-next-line
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
      <FloatingLabel controlId="floatingSubject" label="Add a youtube URL of your preview video" className="mb-3">
        <Form.Control ref={previewRef} type="preview" placeholder="PreviewURL" />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle1" label={subtitlesCount} className="mb-3">
            <Form.Control ref={subtitle1TitleRef} type="subject" placeholder="Subtitle" />
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
      <FloatingLabel controlId="floatingTextarea3" label="Subtitle Description" className="mb-3">
        <Form.Control
          ref={subtitle1DescriptionRef}
          as="textarea"
          placeholder="Describe your course here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSubject" label="Add a youtube URL of your subtitle video" className="mb-3">
        <Form.Control ref={subtitleVidRef} type="preview" placeholder="SubtitleURL" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Video Description" className="mb-3">
        <Form.Control
          ref={subtitleVidDescRef}
          as="textarea"
          placeholder="Describe your video here"
          style={{ height: '75px' }}
        />
      </FloatingLabel>
      <hr></hr>
      
      </Card.Body>
     <Row><Button onClick={addSubtitle} className="w-25 mx-auto mb-3" variant="primary">Add Subtitle</Button>
      <Button onClick={addCourse} className="w-25 mx-auto mb-3" variant="danger">Add Course</Button></Row> 
    </Card>
  )
}
