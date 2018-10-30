import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

/**
 * @description Compoente que representa a página das prateleiras
 * 
 * @prop {Array} books - Recebe um array dos livros que estão nas prateleiras (inicialmente obtido através da API)
 */
class BookshelfsPage extends Component {

  /**
   * @const {Array} - Propriedade utilizada para "declarar" as prateleiras que existirão
   * Caso haja novas prateleiras futuramente, basta adicioná-las aqui
   */
  shelfs = [
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
  ];

  /**
   * @description Método utilizado apenas para "repassar" o evento de alteração de um livro para o compoente pai
   * 
   * @param {Object} new_book - Objeto que representa o livro que será atualizado. É, basicamente, a estrutura JSON trazida pela API
   * @param {string} new_shelf - String da estante alvo, onde o livro será posto
   */
  update = (new_book, new_shelf) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(new_book, new_shelf);
    }
  }

  render = () => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelfs.map((shelf) =>
              <Bookshelf
                key={shelf.tag}
                title={shelf.title}
                onUpdate={(new_book, new_shelf) => {
                  this.update(new_book, new_shelf);
                }}
                books={this.props.books.filter((book) =>
                  book.shelf === shelf.tag
                )}
              />
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="add-contact">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookshelfsPage;
