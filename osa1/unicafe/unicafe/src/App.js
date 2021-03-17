import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <p>{text} {value}</p>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const sum = good * 1 + neutral * 0 + bad * -1
  const avarage = sum / total
  const positive = good / total * 100
  
  if (total === 0) {
    return (
      <div><p>No feedback given</p></div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text = "good" value = {good}></StatisticLine>
        <StatisticLine text = "neutral" value = {neutral}></StatisticLine>
        <StatisticLine text = "bad" value = {bad}></StatisticLine>
        <StatisticLine text = "all" value = {total}></StatisticLine>
        <StatisticLine text = "avarage" value = {avarage}></StatisticLine>
        <StatisticLine text = "positive" value = {positive}></StatisticLine>
      </div>
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}></Statistics>
      
    </div>
  )
}

export default App
