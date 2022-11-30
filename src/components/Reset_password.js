//import Axios from 'axios';
//import React from 'react';
//import ReactDom from"react-dom";
//import { useState } from 'react';
//import { useEffect,useRef } from 'react';
/*import { Axios } from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";*/
import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function Reset_password() {
    const emailref = useRef();
   // const passwordRef = useRef();
       const Validate_email = async () => {
        const useremail = emailref.current.value;
        const response = await axios.post(APIURL + '/editInfo', { useremail:useremail });
        alert(response);

        
      }
    return (
        <div className="m-3">
            <input className="m-4" ref={emailref} placeholder="email" type="text"/><br/>
            <button onClick={ Validate_email}>sendMail</button>     
            </div>);
}
export default Reset_password;