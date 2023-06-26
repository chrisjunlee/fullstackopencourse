
import { useDispatch } from "react-redux";
import { appendAnec } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anectdoteInput.value;
    event.target.anectdoteInput.value = "";

    const newAnecdote = await anecdoteService.createNew(content)
    console.log('newAnecdote', newAnecdote)
    dispatch(appendAnec(newAnecdote));
  }

  return (
    <form onSubmit={newAnecdote}>
      <div>
        <input name="anectdoteInput" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm