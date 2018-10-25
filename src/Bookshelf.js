import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  state = {
    books: []
  }

  addBook = () => {
    
  }

  removeBook = () => {

  }

  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) =>
              <li key={book.title}>
                <Book
                book={book}
                image={book.image}
                title={book.title}
                authors={book.authors}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf