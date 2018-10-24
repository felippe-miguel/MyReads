import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookshelfsPage from './BookshelfsPage'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookshelfsPage />
        )} />
        <Route path='/search' render={() => (
          <SearchPage />
        )} />
      </div>
    )
  }
}

export default BooksApp
