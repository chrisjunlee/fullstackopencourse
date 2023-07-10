import {gql} from '@apollo/client'

const BOOK_DETAILS = gql`fragment BookDetails on Book {title author {name} published genres}`

const ALL_BOOKS = gql`query { allBooks { title author {name} published genres } }`

const BOOK_ADDED = gql`subscription { bookAdded { ...BookDetails } } ${BOOK_DETAILS}`;

export {ALL_BOOKS, BOOK_ADDED}
