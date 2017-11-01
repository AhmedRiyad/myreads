import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';


class SearchBooks extends Component {
    static propTypes = {
        booksOnShelf: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func
    };

    state = {
        books: [],
        query: ''
    };

    setBooks(books) {
        this.setState({
            books: books.map(book => {
                book.shelf = "none";
                this.props.booksOnShelf.forEach(({id, shelf}) => {
                    if (book.id === id) {
                        book.shelf = shelf;
                    }
                });
                return book;
            })
        });
    }

    searchBooks = (query) => {
        this.setState({
            query: query
        });

        if (query.trim() !== '' && this.state.query.trim() !== query.trim()) {
            BooksAPI.search(query.trim()).then(response => {
                if (response.error) {
                    this.clearBooksList();
                    console.log(response.error);
                } else {
                    this.setBooks(response);
                }
            }).catch((error) => {
                this.clearBooksList();
                console.log(error);
            });
        } else if (query.trim() === '') {
            this.clearBooksList();
        }
    };

    clearBooksList() {
        this.setState({
            books: []
        });
    }

    onBookShelfChange = (book, shelf) => {
        this.setState({
            books: this.state.books.map((b) => {
                if (b.id === book.id) {
                    b.shelf = shelf;
                }
                return b;
            })
        });
        this.props.onBookShelfChange(book, shelf);
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={this.state.query}
                               onChange={(event) => this.searchBooks(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book book={book}
                                      onBookShelfChange={this.onBookShelfChange}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}


export default SearchBooks;