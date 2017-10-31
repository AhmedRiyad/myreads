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
                        books={props.books}
                        shelfTitle='Currently Reading'
                    />
                    <BookShelf
                        books={props.books}
                        shelfTitle='Want to Read'
                    />
                    <BookShelf
                        books={props.books}
                        shelfTitle='Read'
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
};




export default ListBooks;