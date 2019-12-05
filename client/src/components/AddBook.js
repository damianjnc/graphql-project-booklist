import React, { useState, useMemo, useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY } from '../queries/queries'

const getOptions = (loading, error, data) => {

  if (loading) {
    return <option disabled>Loading authors...</option>
  } else if (error) {
    return <option disabled>Error loading authors</option>
  } else {
    return data.authors.map(({ id, name }) => {
      return <option key={id} value={id}>{name}</option>
    })
  }
}

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY)
  const [addBook] = useMutation(ADD_BOOK_MUTATION)
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthor] = useState('')

  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ])

  const nameCB = useCallback(
    (ev) => {
      setName(ev.target.value)
    },
    [],
  )

  const genreCB = useCallback(ev => {
    setGenre(ev.target.value)
  }, [])

  const authorCB = useCallback(ev => {
    setAuthor(ev.target.value)
  }, [])

  const submitFormCB = useCallback(e => {
    e.preventDefault()
    /*  const response = async () => {
       const data = await addBook({
         variables: { name, genre, authorId }
       })
       console.log('data: ', data)

       return data
     }

     response()
   */

    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: GET_BOOKS_QUERY }]
    })
  }, [name, genre, authorId, addBook])

  console.log(`name: ${name}, genre: ${genre}, authorId: ${authorId}`)
  return (
    <form id="add-book" onSubmit={submitFormCB}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={nameCB} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={genreCB} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={authorCB}>
          <option>Select author</option>
          {options}
        </select>
      </div>
      <button>+</button>

    </form>
  )
}

export default AddBook
