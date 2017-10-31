import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';


class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    state = {
        books: []
    };

    searchBooks = (query) => {
        BooksAPI.search(query).then((books) => {
            if (Array.isArray(books)) {
                this.setState({books});
            } else {
                this.setState({books: []});
            }
        });
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
                               onChange={(event) => this.searchBooks(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book book={book}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}


export default SearchBooks;