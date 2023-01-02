import React, {useEffect, useState, useRef,useHistory,Redirect} from 'react';
import { useNavigate } from "react-router-dom";

//import } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminPanel from './AdminPanel';
import Login from './Login';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function AdminAuth(){
    const [flag, setFlag] = useState(false);
    //let history = useHistory();
  
let navigate = useNavigate();
    
const validateResponse = async (req,res) => {
  var response = await axios.get(APIURL+ '/admin',{  withCredentials: true,credentials: "include"} );
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
  // if (!flag){
  //  //  alert("Please login first");
  //   // return navigate('/home');
  
   
  // }
  //console.log(userid);
},[])
/*if (!flag){
   //history.push("/home")
  return <Redirect to ="/home"/>;
}

    return(
        <div className="m-3">
            <hr></hr>
          <div>
            <h1>  Verified</h1>
            <AdminPanel/>
          </div>
          </div>
            /*<div className="m-3"> 
              flag ?(
                 <h1>  Verified</h1>
                 <AdminPanel/>)
            
            </div>
    );*/
  /*  if (flag){
    return(
          <AdminPanel />
    );}
    
      return<Redirect to = '/home'/>*/
    return(

  <div>{flag}
  { flag ? <><h1>Verified</h1>
  <AdminPanel/></> : <>Not Verified</> }
</div>



  );
    
}

export default AdminAuth;      