
import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function ReceiveCertificate() {
    const emailref = useRef();
       const Receivecertificate = async () => {
        const useremail = emailref.current.value;
        const response = await axios.post(APIURL + '/Certificate/receive-certificate', { useremail:useremail });
        alert(response.data);

        
      }

      
       const downloadcertificate = async () => {
        //const useremail = emailref.current.value;
        const response = await axios.get(APIURL + '/Certificate/download-certificate');
        alert(response.data);

        
      }
    return (
        <div className="m-3">
            <input className="m-4" ref={emailref} placeholder="email" type="text"/><br/>
            <button onClick={ Receivecertificate}>sendMail</button>
            <button onClick={ downloadcertificate}>Download now</button>     
            </div>);
}
export default ReceiveCertificate;