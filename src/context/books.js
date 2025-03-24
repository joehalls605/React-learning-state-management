import { createContext, useState } from 'react';

// Creating a custom context to manage and share state across components
const BooksContext = createContext();

// The Provider component will wrap parts of the app and provide context data
function Provider({ children }) {
    const [count, setCount] = useState(5); // Local state to track the count

    // Data and functions to share with other components
    const valueToShare = {
        count,
        incrementCount: () => {
            setCount(count + 1); // Function to increase the count
        }
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
