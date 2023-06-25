
import { useDispatch } from "react-redux";
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anectdoteInput.value;
    event.target.anectdoteInput.value = "";
    console.log("content", content);
    dispatch(createNew(content));
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