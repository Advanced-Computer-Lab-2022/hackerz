import React, {useEffect, useState, useRef,useHistory,Redirect} from 'react';
import { useNavigate } from "react-router-dom";
import CorpCourses from './CorpCourses';
import InstructorCourses from './InstructorCourses';
import Login from './Login';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function InstructorAuth({user}){
    const username = user.username;
    const [flag, setFlag] = useState(false);
     let navigate = useNavigate();
     const [user1, setUser1] = useState({username: ""});
     setUser1({username: username})
    
const validateResponse = async (req,res) => {
    const response = await axios.get(APIURL + '/instructor/' + username + '/my-courses', { })
    //const data = response.data;
  var ValidateResponse = response.data;
  if (ValidateResponse === "Unauthorised"){
       setFlag(false);
      //history.push("/home")

  }
  else{
    setFlag(true);
  }
}


useEffect(() => {
  validateResponse();
  if (!flag){
   //  alert("Please login first");
    return navigate('/home');
  
    
    
   
  }

},[])


    return(

  <div>
  <h1>  Verified</h1>
     <InstructorCourses user={user}/>
</div>



  );
    
}

export default InstructorAuth;      