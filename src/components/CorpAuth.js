import React, {useEffect, useState, useRef,useHistory,Redirect} from 'react';
import { useNavigate } from "react-router-dom";

//import } from 'react-router-dom';
import CorpCourses from './CorpCourses';
import Login from './Login';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function CorpAuth(){
    const [flag, setFlag] = useState(false);
     let navigate = useNavigate();
    
const validateResponse = async (req,res) => {
    const response = await axios.get(APIURL + 'corp/courses', {  })
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
//validateResponse();
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
     <CorpCourses/>
</div>



  );
    
}

export default CorpAuth;      