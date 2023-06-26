import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes, vote } from './requests'
import { useMutation, useQueryClient } from "react-query";
import { useContext } from 'react';
import NotifyContext from './NotifyContext';


const App = () => {
  const [msg, dispatch] = useContext(NotifyContext);

  const queryClient = useQueryClient()
  const voteMutation = useMutation(vote, {
    onSuccess: () => { queryClient.invalidateQueries('anecdotes')}
  })

  const handleVote = (anecdote) => {
    const msg = anecdote.content.substring(0, Math.min(20, anecdote.content.length))
    dispatch({ type: "SET", payload: `Voted for: ${msg}: ${anecdote.votes}` });
    console.log('anecdote', anecdote)
    voteMutation.mutate(anecdote)
  }

  const result = useQuery("anecdotes", getAnecdotes)
  console.log('result', result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
