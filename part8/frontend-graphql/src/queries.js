import {gql} from '@apollo/client'

const ALL_BOOKS = gql`query { allBooks { title author {name} published genres } }`

export {ALL_BOOKS}
