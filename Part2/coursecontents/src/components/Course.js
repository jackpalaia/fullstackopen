import React from 'react'

const Course = ({course}) => (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((result, x) => result + x.exercises, 0);
    return(
      <p>Total of {sum} exercises</p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(x => <Part part={x} key={x.name} />)}
      </div>
    )
  }

export default Course