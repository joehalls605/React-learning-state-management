import { createContext, useState } from 'react';
import axios from "axios";

// Creating a custom context to manage and share state across components
const BooksContext = createContext();

// The Provider component will wrap parts of the app and provide context data
function Provider({ children }) {

    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:3001/books");

        setBooks(response.data);
    }


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


    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    // Combining the data and sharing ability using the Provider
    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    );
}

export { Provider };
export default BooksContext;
