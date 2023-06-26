import { useSelector, useDispatch } from "react-redux"
import {vote, deleteById} from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ anecdotes, filter}) =>
      anecdotes.filter((anecObj) =>
        anecObj.content.toLowerCase().includes(filter)
      )
    );
    
    const voteHandler = async (id) => {
      dispatch(vote(id))
      dispatch(setNotification(`Voted for: ${id}`, 3))
    }

    const deleteHandler = async (id) => {
      dispatch(deleteById(id))
    }

    const style = {
      padding: 2
    };

  return (
    <>
      {anecdotes
        .toSorted((a, b) => (a.votes < b.votes ? 1 : -1))
        .map((anecdote) => (
          <div key={anecdote.id} style={style} >
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