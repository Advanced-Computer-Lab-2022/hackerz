import React, {useEffect, useState, useRef} from 'react';
//import CoursesList from './CoursesList';
//import ReactDOM from 'react-dom/client';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function Login(){
     const useremailref = useRef();
    const userpassref = useRef();
  
  //  const emailref= useRef();
    


const handleSubmit = async (event) => {
    event.preventDefault();
    const useremail = useremailref.current.value;
   const password= userpassref.current.value;
    
   

    const params = { useremail, password }
    const response = await axios.post(APIURL + '/home', { params })
    alert(response.data);
   // console.log(response.data);
    //alert( useremail +"" + password) ;
  }

  return (
    
        <>
        <div>Please Log in first to be authorized user
        </div>
          <form onSubmit= {handleSubmit}>
           
            
            <div> 
            <label>Please Enter your E-mail</label>
            <input className="m-1" ref={useremailref} placeholder="User e-mail" type="text" required/>
            </div>
            <div> 
            <label>Please Enter your Password</label>
            <input className="m-1" ref={userpassref} placeholder="User Password" type="password" required/>
            </div>
            <input type="submit" />
           
          </form>
        </>
      
  )


  }
export default Login;   