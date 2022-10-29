import React from 'react'

export default function Course({course}) {
  const link = "/courses/" + course._id;
  return (
    <div>
        <a href={link}>{course.title}</a> by {course.instructorUsername} 
        { course.price ? (course.price === 0 ?
         <span style={{color: "red"}}> (FREE)</span> 
         : <> for ${course.price}</>):<></>}
         <p>Description: {course.description}</p>
        <hr></hr>
    </div>
  )
}
