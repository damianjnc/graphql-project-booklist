import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_BOOK_QUERY } from '../queries/queries'

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    skip: !bookId,
    variables: { id: bookId }
  })

  let content;

  if (loading) {
    content = <p>Loading...</p>
  } else if (error) {
    content = <p>Error:(</p>
  } else if (!bookId) {
    content = <p>No book selected</p>
  } else {
    console.log(data)
    const books = data.book.author.books.map(({ id, name }) => {
      return <li key={id}>{name}</li>
    })

    content = (
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
          {books}
        </ul>
      </div>)
  }

  return (
    <div id="book-details">
      {content}
    </div>
  )
}

export default BookDetails;

