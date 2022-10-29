import React from 'react'

export default function Course({course}) {
  return (
    <div>
        <h2>{course.title} by {course.instructorUsername} for ${course.price}</h2>
    </div>
  )
}
