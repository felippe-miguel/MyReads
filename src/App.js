import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookshelfsPage from './BookshelfsPage';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

/**
 * @description Componente principal - Responsável por manter o estado (fonte da verdade) e
 * fazer a chamada para os links das páginas do app
 * 
 */
class BooksApp extends React.Component {
  state = {
    books: []
  };

  /**
   * @description Método utilizado na construção do componente para obter os livros das estantes através da API
   */
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }));
    });
  }

  /**
   * @description Método utilizado para atualizar alterações do state do app
   * Quando uma prateleira é selecionada para um determinado livro, é executada uma série de eventos dos componentes
   * filhos até chegar ao componente pai, onde o estado da aplicação é alterado e, por fim, os componentes atualizados
   * O método procura pelo livro e atualiza sua prateleira, caso não encontre o livro na lista
   * (que só possui os livros que já estavam nas prateleiras), é adicionado um novo livro ao array books
   * 
   * @param {Object} new_book - Objeto que representa o livro que será atualizado. É, basicamente, a estrutura JSON trazida pela API
   * @param {string} new_shelf - String da estante alvo, onde o livro será posto
   */
  update = (new_book, new_shelf) => {
    let old_books = this.state.books.slice();
    let find_book = false;
    
    let new_books = old_books.map((book) => {
      if (book.id === new_book.id) {
        find_book = true;
        book.shelf = new_shelf;
      }

      return book;
    });

    // Caso não tenha encontrado o livro para alterá-lo, adiciona um novo ao array que será repassado para this.state.books
    if (!find_book) {
      let modified_book = new_book;

      modified_book.shelf = new_shelf;
      new_books.push(modified_book);
    }

    this.setState({
      books: new_books
    });
  }

  /**
   * @description Render padrão. Criei dois componentes para representar as páginas do app,
   * assim posso chamá-los neste componente de maneira mais clara para  trabalhar com as rotas
   */
  render = () => {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookshelfsPage
            books={this.state.books}
            onUpdate={(new_book, new_shelf) => {
              this.update(new_book, new_shelf);
            }
          } />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            myBooks={this.state.books}
            onUpdate={(shelf, id) => {
              this.update(shelf, id);
            }
          }/>
        )} />
      </div>
    );
  }
}

export default BooksApp;
