import React from 'react'

const Header = (props) => { 
    return (
      <>
        <h1>{props.name}</h1>
      </>
)}
  
const Part = (props) => {
    return (
        <>
            <p key={props.id}>
                {props.part} {props.exercises}
            </p>
        </>
)}
  
const Content = ({parts}) => {
    return (
        <>      
        {parts.map(part => 
          <Part key = {part.id} part={part.name} exercises = {part.exercises}/>
        )}
        </>
)}


const Total = ({parts}) => {
const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
let sum = parts.reduce(reducer,0);

return (
    <>
    <p><b>Total of exercises {sum}</b></p>
    </>
)}

const Course = ({course}) => (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

export default Course