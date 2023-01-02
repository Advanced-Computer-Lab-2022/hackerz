import { useState } from "react"
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, {useRef} from 'react'
const APIURL = "http://localhost:8000";
const axios = require('axios').default;


const Report =({ user })=>{
    // /report
    // /report/:user/:coursetitle

    const [type, setType] = useState("");

    let {id} = useParams();

    const descriptionRef = useRef();

    const onOptionChange = e => {
        var ele = document.getElementsByTagName('input')
        for(var i = 0; i < ele.length; i++) {
                  
            if(ele[i].type==="radio") {
              
                if(ele[i].checked){
                    setType(ele[i].value)
                }
            }
        }
    } 

    const addReport = async () => {
        const description = descriptionRef.current.value;

        const data = {type, description};

        // add userid before course id
        // const link = APIURL + '/report/6352b60ded327d9c221abcc6/salmaa';
        const link = APIURL + '/report/' + id + '/' + user.username;
        console.log(user.username);
        await axios.post(link, data);

        descriptionRef.current.value = "";

        alert("Report Submitted")

    }

    return(
        <Card className="mt-4 w-50 mx-auto my-4">
            <Card.Header><strong>Report a Problem</strong></Card.Header>
            <Card.Body>
                <p>Please select the type of problem you have.</p>

                <Form.Check
                inline
                label="Technical"
                value="Technical"
                name="group1"
                type='radio'
                id={`tech`}
                onChange={onOptionChange}
                checked={type==="Technical"}
                />

                <Form.Check
                    inline
                    label="Financial"
                    value="Financial"
                    name="group1"
                    type='radio'
                    id={`fin`}
                    onChange={onOptionChange}
                    checked={type==="Financial"}
                />
                <Form.Check
                    inline
                    label="Other"
                    value="Other"
                    name="group1"
                    type='radio'
                    id={`oth`}
                    onChange={onOptionChange}
                    checked={type==="Other"}
                />
                <p>{"\n"}</p>
                <FloatingLabel
                    controlId="floatingTitle"
                    label="Describe your problem"
                    className="mb-3"
                >
                <Form.Control ref={descriptionRef} type="title" placeholder="Title" />
                </FloatingLabel>
            </Card.Body>
            <Button onClick={addReport} className="w-25 mx-auto mb-3" variant="primary">Submit Report</Button>
        </Card>

    )
}

export default Report;
