import React from 'react'
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import countries from '../countries.json';
import { my_country } from './Country';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function ReportView(props) {
  let navigate = useNavigate();
  const report = props.report;
  const link = "/report/" + report._id;

  return (
    <Card style={{width:"18%"}} className="m-3">
      <Card.Body>
        {/* <Card.Title>{course.subject}: {course.title}</Card.Title> */}
        {/* <Card.Text>{course.description}</Card.Text> */}
      </Card.Body>
    </Card>
  )
}
