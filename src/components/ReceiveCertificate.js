
import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
//import FileDownload from 'file-download';
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
       /* const response = await axios.get(APIURL + '/Certificate/download-certificate',{responseType:"blob"});
        //alert(response.data);
       // FileDownload(response.data, "Certificate.pdf");
       const fileURL = window.URL.createObjectURL(blob);
       // Setting various property values

       let alink = document.createElement('a');
       alink.href = fileURL;
       alink.download = 'SamplePDF.pdf';
       alink.click();*/
       fetch('Certificate.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'Certificate.pdf';
            alink.click();
        })
    })


        
      }
    return (
        <div className="m-3">
            <input className="m-4" ref={emailref} placeholder="email" type="text"/><br/>
            <button onClick={ Receivecertificate}>sendMail</button>
            <button onClick={ downloadcertificate}>Download now</button>     
            </div>);
}
export default ReceiveCertificate;