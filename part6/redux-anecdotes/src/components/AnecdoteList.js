import { useSelector, useDispatch } from "react-redux"
import {vote, deleteById} from "../reducers/anecdoteReducer"
import { setNotify, clearNotify, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filterState = useSelector(({anec, filter}) => filter)

    const anecdotes = useSelector(({ anecdotes, filter}) =>
      anecdotes.filter((anecObj) =>
        anecObj.content.toLowerCase().includes(filter)
      )
    );
    
    const voteHandler = async (id) => {
      dispatch(vote(id))
      dispatch(setNotification(`Voted for: ${id}`, 3))
      // dispatch(setNotify(`Voted for: ${id}`))
      // setTimeout(() => dispatch(clearNotify()), 4000)
    }

    const deleteHandler = async (id) => {
      dispatch(deleteById(id))
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
              <button onClick={() => deleteHandler(anecdote.id)}>delete</button>
            </div>
          </div>
        ))}
    </>
  );
}

export default AnecdoteList