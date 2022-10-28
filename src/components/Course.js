import React from 'react'

export default function Course({course}) {
  return (
    <div>
        <h2>{course.title} by {course.instructorUsername}</h2>
    </div>
  )
}
