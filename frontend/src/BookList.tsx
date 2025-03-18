import { useState, useEffect } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  //useEffect goes and gets the data when it needs to, rather than making requests back to back
  useEffect(
    () => {
      const fetchBooks = async () => {
        //Go look for the data and wait for it to come in. Store it in a variable called "response."
        const response = await fetch('https://localhost:5000/Books/AllBooks');
        //Convert response to json and store in new variable called "data".
        const data = await response.json();
        setBooks(data); //update variable "books" with the data we just fetched.
      };

      fetchBooks();
    },
    [] //feed in an empty array if nothing comes back
  );

  return (
    <>
      <h1>Books</h1>
      <br />
      {books.map((b) => (
        <div className="bookCard">
          <h1>{b.title}</h1>
          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>ISBN: {b.isbn}</li>
            <li>Classification: {b.classification}</li>
            <li>Category: {b.category}</li>
            <li>Page Count: {b.pageCount}</li>
            <li>Price: ${b.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
