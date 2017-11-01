import React from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

import {
    Link
} from 'react-router-dom';


const ListBooks = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf
                        books={props.books.filter(({shelf}) => shelf === "currentlyReading")}
                        shelfTitle='Currently Reading'
                        onBookShelfChange={props.onBookShelfChange}
                    />
                    <BookShelf
                        books={props.books.filter(({shelf}) => shelf === "wantToRead")}
                        shelfTitle='Want to Read'
                        onBookShelfChange={props.onBookShelfChange}
                    />
                    <BookShelf
                        books={props.books.filter(({shelf}) => shelf === "read")}
                        shelfTitle='Read'
                        onBookShelfChange={props.onBookShelfChange}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>
                    Add a book
                </Link>
            </div>
        </div>
    )
};

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func
};


export default ListBooks;