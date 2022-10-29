import React from 'react'

export default function Course({course}) {
  return (
    <div>
        <a href="#">{course.title}</a> by {course.instructorUsername} 
        {course.price === 0 ? <span style={{color: "red"}}> (FREE)</span> : <> for ${course.price}</>}
        <hr></hr>
    </div>
  )
}
