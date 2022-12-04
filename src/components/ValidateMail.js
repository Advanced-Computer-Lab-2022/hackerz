import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import CoursesList from './CoursesList';
import ConfirmPassword from './ConfirmPassword';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function ValidateMail(){


var {userid,token} = useParams();
const [flag, setFlag] = useState(false);

const validateResponse = async (req,res) => {
  var response = await axios.get(APIURL+ '/editInfo/reset-password/' + userid +'/'+ token);
  var ValidateResponse = response.data;
  if (ValidateResponse === "Verified"){
       setFlag(true);
  }
}
useEffect(() => {
  validateResponse();
  console.log(userid);
},[])

    return(
        <div className="m-3">
            <hr></hr>
      {
        flag ? (
          <div>
            <h1>  Verified</h1>
            <ConfirmPassword id = {userid} token={token}/>
          </div>
        ) : (
          <div>
            <h2>Mail Not Verified</h2>
          </div>
        )
      }
            </div>
    );
}
export default ValidateMail;