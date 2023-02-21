import Axios from 'axios';

import React from 'react';
import ReactDom from"react-dom";
import { useState } from 'react';
import { useEffect } from 'react';
function Courses (){
 const [search_term, setSearch_term]=useState("");
 const[min_value,setMin_value]= useState(0);
 const[max_value,setMax_value]= useState(0);
 const [list_of_courses, setList_of_courses]=useState([]);
  useEffect (()=>{
     Axios.get("http://localhost:3000/courses", {query: {search_term}, minPrice:{min_value},maxPrice:{max_value}}).then((response)=>{
    setList_of_courses(response.data)});
    
  },[]);

 const getupdate =()=>{
    Axios.get("http://localhost:3000/courses",{query: {search_term}, minPrice:{min_value},maxPrice:{max_value}}).then((response)=>{
        setList_of_courses(response.data)});
      
 }
  
 return (
   
    <><><><><>
    <input type="text" placeholder='..Search' onChange={(event => setSearch_term(event.target.value))} />

     </><input type="text" placeholder='..Min' onChange={(event => setMin_value(event.target.value))} /></>
         <input type="text" placeholder='..Max' onChange={(event => setMax_value(event.target.value))} /></>
     </><button onClick={getupdate()}> Submit </button></>
     
 );
}
export default Courses;