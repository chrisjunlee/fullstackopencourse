import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes, vote } from './requests'
import { useMutation, useQueryClient } from "react-query";

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation(vote, {
    onSuccess: () => { queryClient.invalidateQueries('anecdotes')}
  })

  const handleVote = (anecdote) => {
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
