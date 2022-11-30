import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import CoursesList from './CoursesList';
import Enter_password from './Enter_password';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";
function ValidateMail(){

var {userid,token} = useParams();
axios.get(APIURL+ '/editInfo' + '/reset-password/' + userid + token);
var ValidateResponse= respone.data;
var flag =false;
if (ValidateResponse== "Verified"){
     flag =true;

}




    return(
        <div className="m-3">
            
            

            <hr></hr>
      {
        flag ? (
          <div>
            <h1>  Verified</h1>
            < Enter_password id = {userid} token={token} />
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