import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const GET_BOOKS_QUERY = gql`
    {
        books {
            name
            id
        }
    }
`

class BookList extends Component {
    render(){
        return(
            <div>
                <ul id="book-list">
                    <li>Book name</li>
                </ul>
            </div>
        );
    }
}

export default graphql(GET_BOOKS_QUERY)(BookList);
