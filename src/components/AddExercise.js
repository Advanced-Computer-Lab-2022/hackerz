import React, {useRef, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
export default function AddExercise() {
  const {id} = useParams();
  const titleRef = useRef();
  const questionRef = useRef();
  const correctAnswerRef = useRef();
  const answer1Ref = useRef();
  const answer2Ref = useRef();
  const answer3Ref = useRef();
  const answer4Ref = useRef();

  const [questions, setQuestions] = useState([]);

  const addQuestion = async () => {
    const questionText = questionRef.current.value;
    const correctAnswer = Number(correctAnswerRef.current.value);
    const answer1 = answer1Ref.current.value;
    const answer2 = answer2Ref.current.value;
    const answer3 = answer3Ref.current.value;
    const answer4 = answer4Ref.current.value;
    const question = {questionText, answerOptions: [{
      answerText: answer1, isCorrect: correctAnswer === 1},{
      answerText: answer2, isCorrect: correctAnswer === 2},{
      answerText: answer3, isCorrect: correctAnswer === 3},{
      answerText: answer4, isCorrect: correctAnswer === 4}]};
    setQuestions(questions.concat(question))
    
    questionRef.current.value = "";
    correctAnswerRef.current.value = "";
    answer1Ref.current.value = "";
    answer2Ref.current.value = "";
    answer3Ref.current.value = "";
    answer4Ref.current.value = "";
  }
  
  const addExercise = async () => {
    const title = titleRef.current.value;
    const data = {title, questions};
    const link = APIURL + "/courses/" + id + "/add-exercise";
    await axios.post(link, data);

    titleRef.current.value = "";
    alert("Exercise Added")
    console.log(questions)
  }
  return (
    <Card className="mt-4 w-50 mx-auto my-4">
      <Card.Header><strong>Add Exercise Form</strong></Card.Header>
      <Card.Body>
      <FloatingLabel
        controlId="floatingTitle"
        label="Title"
        className="mb-3"
      >
        <Form.Control ref={titleRef} type="title" placeholder="Title" />
      </FloatingLabel>
      <hr></hr>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingSubtitle1" label="Question" className="mb-3">
            <Form.Control ref={questionRef} type="subject" placeholder="Question" style={{ height: '75px' }}/>
        </FloatingLabel>
        </Col>
        <div className="h-100 col-md-4">
            <Col>
            <FloatingLabel controlId="floatingSubtitle1Duration" label="Correct Answer # (1-4)" className="mb-3">
            <Form.Control ref={correctAnswerRef} type="Subtitle1Duration" placeholder="Subtitle1Duration" style={{ height: '75px' }} />
        </FloatingLabel>
            </Col>
        </div>
      </Row>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 1" className="mb-3">
        <Form.Control
          ref={answer1Ref}
          as="textarea"
          style={{ height: '60px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 2" className="mb-3">
        <Form.Control
          ref={answer2Ref}
          as="textarea"
          style={{ height: '60px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 3" className="mb-3">
        <Form.Control
          ref={answer3Ref}
          as="textarea"
          style={{ height: '60px' }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea3" label="Answer 4" className="mb-3">
        <Form.Control
          ref={answer4Ref}
          as="textarea"
          style={{ height: '60px' }}
        />
      </FloatingLabel>
      <hr></hr>
      </Card.Body>
      <Row><Button onClick={addQuestion} className="w-25 mx-auto mb-3" variant="primary">Add Question</Button>
      <Button onClick={addExercise} className="w-25 mx-auto mb-3" variant="danger">Create Exercise</Button></Row>
    </Card>
  )
}
