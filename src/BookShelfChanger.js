import React, { Component } from 'react'

class BookShelfChanger extends Component {

  options = [
    {
      value: "move",
      label: "Move to...",
      disabled: true
    },
    {
      value: "currentlyReading",
      label: "Currently Reading",
      disabled: false
    },
    {
      value: "wantToRead",
      label: "Want to Read",
      disabled: false
    },
    {
      value: "read",
      label: "Read", 
      disabled: false
    },
    {
      value: "none",
      label: "None",
      disabled: false
    },
  ]

  createOptions = () => {
    return this.options.map((option) => 
      <option
      key={option.value}
      value={option.value}
      disabled={option.disabled}>
        {option.label}
      </option>
    )
  }

  handleChange = (e) => {
    let shelf = e.target.value

    if (this.props.onChange) {
      this.props.onChange(shelf)
    }
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select value={this.props.selectedOption}  onChange={this.handleChange}>
          {this.createOptions()}
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;