import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  update = (shelf, index) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(shelf, index)
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
                <Book onUpdate={ (shelf) => {this.update(shelf, book.id)} } book={book} />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf