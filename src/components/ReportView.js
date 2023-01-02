import React from 'react'
import { useEffect } from "react"
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

  

  useEffect(() => {
    console.log(props.report[0].repType);
    
},[])
  return (
    <Card style={{width:"30%"}} className="m-3">
      <br></br>
      <Card.Title>Course: {props.report[0].course}</Card.Title>
      <Card.Body>
        <Card.Text>Description: {props.report[0].description}</Card.Text>
        <Card.Text>Type: {props.report[0].repType}</Card.Text>
        <Card.Text>Current Status: {props.report[0].status}</Card.Text>
      </Card.Body>
    </Card>
  )
}
