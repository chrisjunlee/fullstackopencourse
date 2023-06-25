import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filterState = useSelector(({anec, filter}) => filter)
    console.log('filterState', filterState)

    const anecdotes = useSelector(({ anecdotes, filter }) =>
      anecdotes.filter( anecObj => anecObj.content.toLowerCase().includes(filter))
    )
    
    const voteHandler = (id) => {
      console.log('vote', id)
      dispatch(vote(id))
    }

  return (
    <>
      {anecdotes
        .toSorted((a, b) => (a.votes < b.votes ? 1 : -1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandler(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
}

export default AnecdoteList