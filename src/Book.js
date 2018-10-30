import React,  { Component } from 'react';
import BookShelfChanger from './BookShelfChanger'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  update = (shelf) => {
    BooksAPI.update(this.props.book, shelf)

    if (this.props.onUpdate) {
      this.props.onUpdate(this.props.book, shelf)
    }
  }

  getShelf = () => {
    return this.props.book.shelf ? this.props.book.shelf : 'none'
  }

  render() {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128, 
            height: 193, 
            backgroundImage: "url(" + ((this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : '') + ")" }}></div>
          <BookShelfChanger
          selectedOption={this.getShelf()}
          onChange={(shelf) => {
            this.update(shelf)
          }}
          />
        </div>
        <div className="book-title">{ this.props.book.title }</div>
        <div className="book-authors">{ (this.props.book.authors) ? (this.props.book.authors.map((author, i, arr) => {
            let result = author;
            if (!(arr.length - 1 === i)) {
              result += ", "
            }

            return result
          })) :
            ""
          }
        </div>
      </div>
    );
  }
}

export default Book;