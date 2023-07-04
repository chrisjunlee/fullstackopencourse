import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [year, setYear] = useState(null);
  
  const ALL_AUTHORS = gql`query { allAuthors { name bookCount born } }`
  const SET_AUTHOR_YEAR = gql`
    mutation setYear($name: String!, $year: Int!) {
      editAuthor(name: $name, setBornTo: $year) {
        name born
      }
    }
  `;
  
  const [setAuthorYear, {data}] = useMutation(SET_AUTHOR_YEAR, {refetchQueries: [{query: ALL_AUTHORS}]})
  
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) { return null }
  const authors = [...result.data.allAuthors];
  
  const changeBornYear = async (event) => {
    event.preventDefault()

    setAuthorYear({variables: {name: name, year: year}})
    setYear('')
  }
  
  if (!props.show) { return null } 
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Change Birth Year</h2>
      <form onSubmit={changeBornYear}>
        <div>
          Author:
          <select onChange={({target}) => setName(target.value)} >
            {authors.map(a => <option value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          Year:
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">update birth year</button>
      </form>
    </div>
  );
};

export default Authors;
