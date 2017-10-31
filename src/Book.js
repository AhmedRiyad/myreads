import React from 'react';
import PropTypes from 'prop-types';


const Book = (props) => {

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                     style={{
                         width: 128,
                         height: 193,
                         backgroundImage: `url("${props.book.imageLinks && props.book.imageLinks.thumbnail}")`
                     }}/>
                <div className="book-shelf-changer">
                    <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            {props.book.authors && props.book.authors.map((author, index) => (
                <div className="book-authors" key={index}>
                    {author}
                </div>
            ))}
        </div>
    );
};


Book.propTypes = {
    book: PropTypes.object.isRequired
};


export default Book;