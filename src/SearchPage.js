import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
  state = {
    text: '',
    books: []
  }

  update = (new_book, shelf) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(new_book, shelf)
    }
  }

  checkIfIsOnAShelf = (actual_book) => {
    let new_book = this.props.allBooks.filter(book => book.id === actual_book.id)

    if (new_book.length > 0) {
      return new_book[0]
    } else {
      return actual_book
    }
  }

  handleChange = (e) => {
    let value = e.target.value
    
    this.setState({
      text : value
    })

    if (value !== "") {
      BooksAPI.search(value).then((books) => {
        if (Array.isArray(books)) {
          this.setState(() => ({
            books
          }))
        } else {
          this.setState({
            books: []
          })
        }
      })
    } else {
      this.setState({
        books: []
      })
    }
  }

  render = () => {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.handleChange} value={this.state.text} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.books.map((book) =>
            <li key={book.id}>
              <Book
              onUpdate={(new_book, shelf) => {
                this.update(new_book, shelf)
              }}
              book={this.checkIfIsOnAShelf(book)}
              title={book.title}
              authors={book.authors} />
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
