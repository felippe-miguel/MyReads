import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

/**
 * @description Componente que representa a página de buscas
 * 
 * @prop {Array} myBooks - Recebe uma lista dos livros que já estão nas prateleiras.
 * Essa propriedade é utilizada para definir quando um livro obtido através da busca já está em alguma prateleira
 * tendo em vista que os objetos dos livros obtidos através do método search da API não possuem a propriedade "shelf"
 */
class SearchPage extends Component {
  state = {
    text: '',
    books: []
  }

  /**
   * @description Método utilizado apenas para "repassar" o evento de alteração de um livro para o compoente pai
   * 
   * @param {Object} new_book - Objeto que representa o livro que será atualizado. É, basicamente, a estrutura JSON trazida pela API
   * @param {string} shelf - String da estante alvo, onde o livro será posto
   */
  update = (new_book, shelf) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(new_book, shelf)
    }
  }

  /**
   * @description Método utilizado para definir se um livro obtido através da API já está em uma prateleira.
   * Em caso positivo, retorna o objeto do livro de mesmo id que possui a propriedade "shelf"
   * 
   * @param {Object} actual_book - Objeto que representa o livro que será verificado
   * 
   * @return {Object} - Retorna o novo objeto do livro(que possui a propriedade "shelf") ou retorna o mesmo livro recebido como argumento
   */
  checkIfIsOnAShelf = (actual_book) => {
    let new_book = this.props.myBooks.filter(book => book.id === actual_book.id);

    if (new_book.length > 0) {
      return new_book[0];
    } else {
      return actual_book;
    }
  }

  /**
   * @description Handle do evento change do input text. Responsável por atualizar a informação this.state.text
   * e executar a busca através da API
   * 
   * @param {Object} e - Evento recebido do input text
   */
  handleChange = (e) => {
    let value = e.target.value;
    
    this.setState({
      text : value
    });

    if (value) {
      BooksAPI.search(value).then((books) => {
        if (Array.isArray(books)) {
          this.setState(() => ({
            books
          }));
          return;
        }
      });
    }

    this.setState({
      books: []
    });
  }

  render = () => {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.handleChange} value={this.state.text} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) =>
              <li key={book.id}>
                <Book
                  book={this.checkIfIsOnAShelf(book)}
                  title={book.title}
                  authors={book.authors} 
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

export default SearchPage;
