import React from 'react'
import Instructor from './Instructor'
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

const APIURL = 'http://localhost:5000';

export default function InstructorsList(props) {
    const [instructors, setInstructors] = useState([]);
    const getInstructors = async () => {
        const response = await axios.get(APIURL + '/instructor');
        const data = response.data;
        console.log(data)
        setInstructors(data);
    }

    useEffect(() => {
        getInstructors();
      },[])

    return (
        <div>
            <Row className="d-flex mx-auto">
                {instructors.map(instructor => {
                    return <Instructor key={instructor._id} instructor={instructor} />
                })}
            </Row>
        </div>

    )
}
