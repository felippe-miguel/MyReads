import React, { Component } from 'react';
import Book from './Book';

/**
 * @description Classe que representa uma única prateleira
 * 
 * @prop {Array} books - Recebe um array dos livros que pertencem a essa prateleira atualmente
 * @prop {string} title - Recebe uma string que representa o titulo desta prateleira
 */
class Bookshelf extends Component {

  /**
   * @description Método utilizado apenas para "repassar" o evento de alteração de um livro para o compoente pai
   * 
   * @param {Object} book - Objeto que representa o livro que será atualizado. É, basicamente, a estrutura JSON trazida pela API
   * @param {string} shelf - String da estante alvo, onde o livro será posto
   */
  update = (book, shelf) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(book, shelf);
    }
  }

  render = () => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) =>
              <li key={book.title}>
                <Book 
                  book={book}
                  onUpdate={(new_book, shelf) => {
                    this.update(new_book, shelf)
                  }}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
