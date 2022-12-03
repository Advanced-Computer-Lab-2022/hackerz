import React, {useEffect, useState, useRef} from 'react';
import CoursesList from './CoursesList';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function EditBiography({user}) {
    const username = user.username;
    const bioRef = useRef();
    const changeBiography= async () => {
    const response = await axios.post(APIURL + '/instructor/'+ username + '/editbiography', {  userbiography:bioRef.current.value })
    alert(response.data);
    }
    return(
        <div className="m-3">
        <input className="m-4" ref={bioRef} placeholder="Biography" type="text"/><br/>
        <button onClick={changeBiography}>Submit</button> 
        
        </div>
    );

}
export default EditBiography;