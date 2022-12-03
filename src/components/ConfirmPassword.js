import React, {useEffect, useState, useRef} from 'react';
//import CoursesList from './CoursesList';
//import ReactDOM from 'react-dom/client';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function ConfirmPassword(props){
    const Passref = useRef();
    const ConfirmPassref = useRef();
    const id = props.id;
    const token= props.token;
    const changePassword = async () => {
         const Pass = Passref.current.value;
         const confirmPass= ConfirmPassref.current.value;
         const response = await axios.post(APIURL + '/editInfo/reset-password/'+ id +'/'+ token,
          { new_password:Pass,confirm_new_password:confirmPass });
         alert(response.data);
 
         } 
         ///reset-password/:id/:token
         return(
            <div className="m-3">
            <input className="m-1" ref={Passref} placeholder="New Password" type="text"/>
            <button onClick={changePassword}>Search</button> 
            <input className="m-4" ref={ConfirmPassref} placeholder="Confirm Password" type="text"/><br/>
            </div>
         );
       }

       export default ConfirmPassword;      