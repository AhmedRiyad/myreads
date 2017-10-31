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
                            books={this.state.books}/>
                    )}
                    />
                    <Route
                        exact path='/search' render={() => (
                        <SearchBooks
                            books={this.state.books}/>
                    )}
                    />
                </div>
            </Router>
        )
    }
}

export default BooksApp
