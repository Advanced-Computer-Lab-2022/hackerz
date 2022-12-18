import React, {useEffect, useState, useRef} from 'react';
//import CoursesList from './CoursesList';
//import ReactDOM from 'react-dom/client';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function Register(){
    const usernameref= useRef();
    const useremailref = useRef();
    const userpassref = useRef();
    const confirmpassref= useRef();
  //  const emailref= useRef();
    const countryref= useRef();


const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameref.current.value;
    const userpassword= userpassref.current.value;
    const confirmpasswrod = confirmpassref.current.value;
    const useremail = useremailref.current.value;
    const usercountry = countryref.current.value;

    const params = { username, userpassword, confirmpasswrod, usercountry, useremail }
    const response = await axios.get(APIURL + '/home/register', { params })
    alert(response.data);
  }

  return (
    
        <>
          <form onSubmit= {handleSubmit}>
            <div> 
            <label>Please Enter your name</label>
            <input className="m-1" ref={usernameref} placeholder="User Name" type="text" required/>
            </div>
            <div> 
            <label>Please Enter your Password</label>
            <input className="m-1" ref={userpassref} placeholder="User Password" type="password" required/>
            </div>
            <div> 
            <label>Please Confirm your Password</label>
            <input className="m-1" ref={confirmpassref} placeholder="Confirm Password" type="password" required/>
            </div>
            <div> 
            <label>Please Enter your E-mail</label>
            <input className="m-1" ref={useremailref} placeholder="User e-mail" type="text" required/>
            </div>
            <div> 
            <label>Please Enter your country</label>
            <input className="m-1" ref={countryref} placeholder="user country" type="text"/>
            </div>
          </form>
        </>
      
  )


  }
export default Register;   