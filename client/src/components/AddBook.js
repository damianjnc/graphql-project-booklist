import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_AUTHORS_QUERY = gql`
  query getAuthorsQuery{
    authors {
      name
      id
    }
  }
`

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error:(</p>

  const { authors } = data

  const authorListItems = authors.map(({ id, name }) => {
    return <option key={id}>{name}</option>
  })
  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {authorListItems}
        </select>
      </div>
      <button>+</button>

    </form>
  )
}

export default AddBook
