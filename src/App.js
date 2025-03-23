import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


function App(){

    const [books, setBooks] = useState([]);

    const editBookById = (id, newTitle) =>{
        const updatedBooks = books.map((book) => {
            if(book.id === id){
                return {...book, title: newTitle} // if id match, return a new object that takes all existing properties and add new title in
            }
            return book // otherwise just return book as usual
        })
        setBooks(updatedBooks);
    }

    const deleteBookById = (id) => {
        const updatedBooks = books.filter((book) =>{
            return book.id !== id;
        })
        setBooks(updatedBooks);
    }

    const createBook = (title) => {
            const updatedBooks = [
                ...books,
                {
                    id: Math.round(Math.random() * 9999),
                    title
                },
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