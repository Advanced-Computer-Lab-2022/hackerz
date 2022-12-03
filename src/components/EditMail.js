import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function EditMail({user}) {
    const username = user.username;
    const mailRef = useRef();
    const changeMail= async () => {
    const response =   await axios.post(APIURL + '/instructor/'+ username + '/editusermail',  {useremail:mailRef.current.value })
    console.log(response);
    alert(response.data);
    }
    return(
        <div className="m-3">
        <input className="m-4" ref={mailRef} placeholder="E-Mail" type="text"/><br/>
        <button onClick={changeMail}>Submit</button> 
        
        </div>
    );

}
export default EditMail;