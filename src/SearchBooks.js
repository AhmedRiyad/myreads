import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import {debounce} from 'throttle-debounce';


class SearchBooks extends Component {
    static propTypes = {
        booksOnShelf: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func
    };

    state = {
        books: []
    };

    constructor() {
        super();
        this.doSearch = debounce(400, this.searchBooks);
    }

    componentDidMount() {
        this.searchInput.focus();
    }

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
        if (query.trim() !== '') {
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
                               ref={(input) => {
                                   this.searchInput = input;
                               }}
                               onChange={(event) => this.doSearch(event.target.value)}/>
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