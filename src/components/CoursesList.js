import React from 'react'
import Course from './Course'

export default function CoursesList({courses}) {

    return (
        <>
        { courses.map(course => {
            return <Course key={course._id} course={course}/>
        }) }
        </>
  )
}
