import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookshelfsPage from './BookshelfsPage'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
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

  update = (new_book, new_shelf) => {
    let old_books = this.state.books.slice()
    let find_book = false
    
    let new_books = old_books.map((book) => {
      if (book.id === new_book.id) {
        find_book = true
        book.shelf = new_shelf
      }

      return book
    })

    if (!find_book) {
      let modified_book = new_book

      modified_book.shelf = new_shelf
      new_books.push(modified_book)
    }

    this.setState({
      books: new_books
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookshelfsPage
          shelfs={this.state.shelfs}
          books={this.state.books}
          onUpdate={(new_book, new_shelf) => {
            this.update(new_book, new_shelf)
          }}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchPage
          allBooks={this.state.books}
          onUpdate={(shelf, id) => {
            this.update(shelf, id)}
          }/>
        )} />
      </div>
    )
  }
}

export default BooksApp
