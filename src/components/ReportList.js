import React from 'react'
import Report from './Report';
import {Row} from 'react-bootstrap'; 
import { useState } from "react"
import { useEffect } from "react"
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {useRef} from 'react'
import ReportView from './ReportView';
const APIURL = "http://localhost:5000";
const axios = require('axios').default;



export default function ReportList({ user }) {
    const [reports, setReports] = useState([]);

    const listReports = async () => {
        const response = await axios.get(APIURL + '/report/' + user.username)
        const data = response.data;
        setReports(data);
        // console.log(reports);
        // console.log(data[0]._id)
    }

    useEffect(() => {
        listReports();
    },[])
    
    return (
        <>
            {
                reports?.length > 0 ? (
                <div>
                    <Row className="d-flex mx-auto">
                        { reports.map(report => {
                             return <ReportView key={report._id} report={reports} />
                        }) }
                    </Row>
                </div>
                ) : (
                <div>
                    <h2>No Reports Pending.</h2>
                </div>
                )
            }
        </>    
  )
}
