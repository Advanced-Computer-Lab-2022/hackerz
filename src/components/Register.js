import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
//import CoursesList from './CoursesList';
//import ReactDOM from 'react-dom/client';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Register(){
    const usernameref= useRef();
    const useremailref = useRef();
    const userpassref = useRef();
    const confirmpassref= useRef();
  //  const emailref= useRef();
    const countryref= useRef();
    let navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameref.current.value;
    const userpassword= userpassref.current.value;
    const confirmpasswrod = confirmpassref.current.value;
    const useremail = useremailref.current.value;
    const usercountry = countryref.current.value;

    const params = { username, userpassword, confirmpasswrod, usercountry, useremail }
    console.log(params)
    const response = await axios.post(APIURL + '/home/register', { params })
    alert(response.data);
    return navigate('/home');
  }

  return (
    
        <>
          <form className="m-3" onSubmit= {handleSubmit}>
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
            <a href="https://www.termsandcondiitionssample.com/live.php?token=joM3Jl3ElJs5nefecx0QsgEoxLQwaCVU">
              Signing up to this website means you have read and accepted the following terms and conditions
            </a><br/>
            <input type="submit" />
          </form>
        </>
      
  )


  }
export default Register;   