import React, { Component } from 'react';

/**
 * @description Componente que representa o botão para trocar livros de prateleiras
 * 
 * @prop {string} selectedOption - Recebe uma string que representa a prateleira atual do livro (Componente pai)
 */
class BookShelfChanger extends Component {

  /**
   * @const {Array} - Representa uma lista de opções da tag select
   */
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

  /**
   * @description Método que varre a lista de options e retorna os options em formato html
   */
  createOptions = () => {
    return this.options.map((option) =>
      <option
        key={option.value}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </option>
    )
  }

  /**
   * @description Escuta o evento change do select e "avisa" o componente pai
   * 
   * @param {Object} e - Evento change do select
   */
  handleChange = (e) => {
    const shelf = e.target.value

    if (this.props.onChange) {
      this.props.onChange(shelf)
    }
  }

  render = () => {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.selectedOption}  onChange={this.handleChange}>
          {this.createOptions()}
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
