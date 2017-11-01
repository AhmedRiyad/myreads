import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.getAllBooks();
    }

    onBookShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(() => this.getAllBooks());
    };

    getAllBooks() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({books})
            });
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Route
                        exact path='/' render={() => (
                        <ListBooks
                            books={this.state.books}
                            onBookShelfChange={this.onBookShelfChange}/>
                    )}
                    />
                    <Route
                        exact path='/search' render={() => (
                        <SearchBooks
                            books={this.state.books}
                            onBookShelfChange={this.onBookShelfChange}/>
                    )}
                    />
                </div>
            </Router>
        )
    }
}

export default BooksApp
