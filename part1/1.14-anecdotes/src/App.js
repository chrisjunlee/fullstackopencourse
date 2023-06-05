import { useState } from 'react'
import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const voteHandler = () => {
    const newState = [...votes]
    newState[selected] += 1
    setVotes(newState)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]} <br/>
      Votes: {votes[selected]} <br/>
      <Button name="Vote" onClick={voteHandler}/>
      <Button onClick={() => setSelected(randInt(anecdotes.length))} name="Next"/>
      <Results votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

const Results = (props) => {
    let maxScore = Math.max(...props.votes)
    let maxIndex = props.votes.indexOf(maxScore)

    if (maxScore == 0) {
      return (<h2>Vote to see highest ranked Anectdote!</h2>)
    }
    else {
      return (
        <>
        <h2>Highest Voted Anecdote</h2>
        {props.anecdotes[maxIndex]}
        </>
      )
    }
}

const Button = (props) => (<button onClick={props.onClick}>{props.name}</button>)

const StatLine = (props) => (<><tr><td>{props.name}:</td><td>{props.val}</td></tr></>)

const randInt = (range) => (Math.floor(Math.random() * range))
  
export default App