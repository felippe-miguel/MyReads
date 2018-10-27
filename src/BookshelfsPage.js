import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class BookshelfsPage extends Component {
  state = {
    books: [],
    shelfs: [
      {
        title: 'Currently Reading',
        tag: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        tag: 'wantToRead'
      },
      {
        title: 'Read',
        tag: 'read'
      },
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  update = (shelf, id) => {
    let old_books = this.state.books.slice()
    
    let new_books = old_books.map((book) => {
      if (book.id === id) {
        book.shelf = shelf
      }
      return book
    })

    this.setState({
      books: new_books
    })
  }
  
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelfs.map((shelf) =>
              <Bookshelf
              onUpdate={(shelf, id) => {
                this.update(shelf, id)}
              }
              key={shelf.tag}
              title={shelf.title}
              books={this.state.books.filter((book) => 
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
