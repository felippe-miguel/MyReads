import React, { Component } from 'react'

class BookShelfChanger extends Component {

  handleChange = (e) => {
    let shelf = e.target.value

    if (this.props.onChange) {
      this.props.onChange(shelf)
    }
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;