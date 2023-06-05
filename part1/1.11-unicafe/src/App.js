import { useState } from 'react'
import './App.css';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header/>
      <Button onClick={() => setGood(good + 1)} name="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral"/>
      <Button onClick={() => setBad(bad + 1)} name="bad"/>
      <Summary feedbacks={[good, neutral, bad]}/>
    </div>
  )
}
const Header = () => (<h1>Give Feedback</h1>)

const Button = (props) => (<button onClick={props.onClick}>{props.name}</button>)

const StatLine = (props) => (<><tr><td>{props.name}:</td><td>{props.val}</td></tr></>)

const Summary = (props) => {

  if (Math.max(...props.feedbacks) == 0) {
    return (
      <>
        <h1>Statistics</h1>
        No feedback given
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatLine name="good" val={props.feedbacks[0]} />
          <StatLine name="neutral" val={props.feedbacks[1]} />
          <StatLine name="bad" val={props.feedbacks[2]} />
          <StatLine name="all" val={props.feedbacks.reduce((acc, score) => acc + score, 0)} />
        </tbody>
      </table>
    </>
  )
}

export default App