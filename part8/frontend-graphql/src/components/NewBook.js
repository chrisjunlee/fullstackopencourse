import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const ADD_BOOK = gql`
    mutation addBook(
      $title: String!
      $published: Int!
      $author: String!
      $genres: [String!]!
    ) {
      addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
      ) {
        title
        author {
          name
          born
          bookCount
        }
        published
      }
    }
  `;

  const AUTHOR_DETAILS = gql`fragment AuthorDetails on Author {name born bookCount}`
  const ALL_BOOKS = gql`query { allBooks { title author {...AuthorDetails} published genres } }${AUTHOR_DETAILS}`;

  const [addBook, {data}] = useMutation(ADD_BOOK, { refetchQueries: [{query: ALL_BOOKS}] })

  const submit = async (event) => {
    event.preventDefault()

    addBook({variables: {title: title, author: author, published: published, genres: genres}})
    console.log('data', data)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook