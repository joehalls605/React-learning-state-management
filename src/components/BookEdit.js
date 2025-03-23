import { useState} from 'react';

function BookEdit({book}){
    const [title, setTitle] = useState(book.title);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title);
    }

    return <form className="book-edit" onSubmit={handleSubmit}>
        <label>{title}</label>
        <input className="input" onChange={handleChange}/>
        <button className="button is-primary">Save</button>
    </form>
}

export default BookEdit;