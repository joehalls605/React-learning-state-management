import { useEffect, useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

function App(){

    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:3001/books");

        setBooks(response.data);
    }

    useEffect(() => {
        fetchBooks(); // this is always called during intial redner because of useEffect
    }, []); // empty array, called on first render, and never called again.
    
    const editBookById = async (id, newTitle) =>{
        const response = axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });
        console.log(response);

        const updatedBooks = books.map((book) => {
            if(book.id === id){
                return {...book, ...response.data} // updated book object from the API
            }
            return book // otherwise just return book as usual
        })
        setBooks(updatedBooks);
    }

    const deleteBookById = async (id) => {

        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) =>{
            return book.id !== id;
        })
        setBooks(updatedBooks);
    }

    const createBook = async (title) => {

        const response = await axios.post("http://localhost:3001/books", {
            title
        });

            const updatedBooks = [
                ...books,
                response.data
            ];
            setBooks(updatedBooks);
    };

    return (
        <div className="app">
            <BookList onEdit={editBookById} onDelete={deleteBookById} books={books}/>
            <BookCreate onCreate={createBook}/>
        </div>
        )
}

export default App;