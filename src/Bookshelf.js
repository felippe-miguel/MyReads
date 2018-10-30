import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  update = (book, shelf) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(book, shelf)
    }
  }

  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) =>
              <li key={book.title}>
                <Book onUpdate={(new_book, shelf) => {
                  this.update(new_book, shelf)}
                }
                book={book}
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