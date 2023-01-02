import React from 'react'
import Report from './Report';
import {Row} from 'react-bootstrap'; 
import { useState } from "react"
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, {useRef} from 'react'
const APIURL = "http://localhost:8000";
const axios = require('axios').default;



export default function ReportList(props) {
    const reports = props.reports;

    const listReports = async () => {
        const params = {}
        const response = await axios.get(APIURL + '/courses', { params })
        const data = response.data;
        setCourses(data);
    }

    useEffect(() => {
        listReports();
    },[])
    
    return (
        <div>  
        <Row className="d-flex mx-auto">
        { reports.map(report => {
            return <Report key={report._id} report={reports}/>
        }) } 
        </Row>
        </div>    
  )
}
