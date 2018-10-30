import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class BookshelfsPage extends Component {

  update = (new_book, new_shelf) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(new_book, new_shelf)
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelfs.map((shelf) =>
              <Bookshelf
              onUpdate={(new_book, new_shelf) => {
                this.update(new_book, new_shelf)}
              }
              key={shelf.tag}
              title={shelf.title}
              books={this.props.books.filter((book) => 
                book.shelf === shelf.tag
              )}
              />
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="add-contact">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookshelfsPage
