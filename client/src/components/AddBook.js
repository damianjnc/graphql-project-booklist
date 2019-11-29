import React from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`

