import { gql, useQuery } from '@apollo/client'

const Books = (props) => {
  const ALL_BOOKS = gql`query { allBooks { title author published genres } }`;
  const result = useQuery(ALL_BOOKS)

  if(result.loading) { return null }
  
  const books = [...result.data.allBooks]
  
  if (!props.show) { return null }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
