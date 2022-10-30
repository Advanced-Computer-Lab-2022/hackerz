import { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const usernameRef = useRef();
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate(); 
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const username = usernameRef.current.value;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }else{
            let path ='/search';
            navigate(path, {state: {user: username}});
        }
        setValidated(true);
    }
  return (
    <div><br/>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="align-items-center">
      <Col xs="auto">
        <Form.Group as={Col} controlId="validationCustomUsername">
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              ref={usernameRef}
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>
     
      <Col xs="auto">
        <Button type="submit" className="">
          Log In
        </Button>
      </Col>
    </Row>
  </Form>
  </div>
  )
}
