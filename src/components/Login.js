import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
//import CoursesList from './CoursesList';
//import ReactDOM from 'react-dom/client';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Login(){
   const [user, setUser] = useState({username: ""});
   const usernameRef = useRef();
     const useremailref = useRef();
    const userpassref = useRef();
    let navigate = useNavigate();
  
  //  const emailref= useRef();
    


const handleSubmit = async (event) => {
    event.preventDefault();
    const useremail = useremailref.current.value;
   const password= userpassref.current.value;
   const username = usernameRef.current.value;
   setUser({username: username})
   

    const params = { useremail, password }
    const response = await axios.post(APIURL + '/home', { params },{ withCredentials: true })
    alert(response.data);
    if(response.data== "first log"){
      return navigate('/editInfo/forget-password');
    }
    else if(response.data=="instructor"){
      return navigate('/instructor/my-courses');
    }
    else if(response.data== "admin"){
      return navigate('/admin');
    }
  
    else if (response.data=='corpTrainee' ){
      return navigate('/corp');
    }
    else if (response.data=='individualTrainee' ){
      return navigate('/search');
    }
   // console.log(response.data);
    //alert( useremail +"" + password) ;
  }

  return (
    
        <>
        <div>Please Log in first to be authorized user</div>
          <form onSubmit= {handleSubmit}>
           
            
            <div> 
            <label>Please Enter your E-mail</label>
            <input className="m-1" ref={useremailref} placeholder="User e-mail" type="text" required/>
            </div>
            <div> 
            <label>Please Enter your username</label>
            <input className="m-1" ref={usernameRef} placeholder="User Name" type="text" required/>
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