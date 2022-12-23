import React, {useEffect, useState, useRef,useHistory,Redirect} from 'react';
import { useNavigate } from "react-router-dom";
//import } from 'react-router-dom';
import Login from './Login';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function TraineeAuth(){
    const [flag, setFlag] = useState(false);
    
  
let navigate = useNavigate();
    
const validateResponse = async (req,res) => {
  var response = await axios.get(APIURL+ '/trainee',{  withCredentials: true,credentials: "include"} );
  var ValidateResponse = response.data;
  if (ValidateResponse === "Unauthorised"){
       setFlag(false);
   

  }
  else{
    setFlag(true);
  }
}
//validateResponse();
useEffect(() => {
  validateResponse();
  if (!flag){
    return navigate('/home');
   
  }
  },[])

    return(

  <div>
  <h1>  Verified</h1>
  <AdminPanel/>
</div>



  );
    
}

export default TraineeAuth;      