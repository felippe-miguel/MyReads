import React,  { Component } from 'react';
import BookShelfChanger from './BookShelfChanger'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  update = (shelf) => {
    BooksAPI.update(this.props.book, shelf)
  }

  render() {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.image }}></div>
          <BookShelfChanger 
          onChange={(shelf) => {
            this.update(shelf)}
          }
          />
        </div>
        <div className="book-title">{ this.props.title }</div>
        <div className="book-authors">{ this.props.authors }</div>
      </div>
    );
  }
}

export default Book;