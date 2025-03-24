import { useEffect, useContext } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';

function App(){

    const { fetchBooks } = useContext(BooksContext);



    useEffect(() => {
        fetchBooks(); // this is always called during intial redner because of useEffect
    }, []); // empty array, called on first render, and never called again.


    return (
        <div className="app">
            <BookList/>
            <BookCreate/>
        </div>
        )
}

export default App;