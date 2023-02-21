import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
//import CoursesList from './CoursesList';
//import ReactDOM from 'react-dom/client';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function ChangePassword(){
    const UserMailref = useRef();
    const OldPassref = useRef();
    const Passref = useRef();
    const ConfirmPassref = useRef();
    // let navigate = useNavigate();
    const Change_password = async () => {      
        const usermail = UserMailref.current.value;
        const oldPass= OldPassref.current.value;
         const Pass = Passref.current.value;
         const confirmPass= ConfirmPassref.current.value;
         const params = { usermail, oldPass,Pass,confirmPass }
         const response = await axios.post(APIURL + '/editInfo/forget-password/',
          { params });
         alert(response.data);
        //  return navigate('/home');
 
         } 
         ///reset-password/:id/:token
         return(
            <div className="m-3">
           <input className="m-1" ref={UserMailref} placeholder="User E-mail" type="text"/>
            <input className="m-4" ref={OldPassref} placeholder="Old Password" type="text"/>  
            <input className="m-1" ref={Passref} placeholder="New Password" type="text"/>
            <input className="m-4" ref={ConfirmPassref} placeholder="Confirm Password" type="text"/><br/>
            <button onClick={Change_password}>Change Password</button> 
            </div>
         );
       }

       export default ChangePassword;      