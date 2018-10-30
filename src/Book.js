import React,  { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';
import * as BooksAPI from './BooksAPI';

/**
 * @description Componente que repesenta um único livro
 * 
 * @prop {Object} book - Recebe um objeto com as propriedades do livro (o mesmo objeto obtido pela API)
 */
class Book extends Component {

  /**
   * @description Método utilizado para atualizar a informação da prateleira atual do livro para a API
   * Também dispara um método do componente pai para que todo o app seja atualizado
   * 
   * @param {string} shelf - String da estante alvo, onde o livro será posto
   */
  update = (shelf) => {
    BooksAPI.update(this.props.book, shelf);

    if (this.props.onUpdate) {
      this.props.onUpdate(this.props.book, shelf);
    }
  }

  /**
   * @description Método utilizado para passar a informação da prateleira atual do livro para o component filho BookShelfChanger
   * 
   * @return {string} - Prateleira atual do livro
   */
  getShelf = () => {
    return this.props.book.shelf ? this.props.book.shelf : 'none'
  }

  /**
   * @description Método que retorna uma string formatada da lista de autores do livro
   * ou uma string vazia caso não haja registro dos autores
   * 
   * @return {string} - Lista de autores do livro
   */
  getAuthors = () => {
    return (this.props.book.authors) ? (
      this.props.book.authors.map((author, i, arr) => {
        let result = author;

        if (!(arr.length - 1 === i)) {
          result += ", ";
        }

        return result
      })
    ) :
      "";
  }

  /**
   * @description Método que retorna a url da thumbnail ou uma string vazia(caso não haja informação da thumbnail)
   * 
   * @return {string} - URL da thumbnail
   */
  getImage = () => {
    return "url(" + ((this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : '') + ")";
  }

  render = () => {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128, 
            height: 193, 
            backgroundImage: this.getImage()
          }}></div>
          <BookShelfChanger
            selectedOption={this.getShelf()}
            onChange={(shelf) => {
              this.update(shelf);
            }}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.getAuthors()}</div>
      </div>
    );
  }
}

export default Book;
