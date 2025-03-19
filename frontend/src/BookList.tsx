import { useState, useEffect } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]); //Set an array of books
  const [pageSize, setPageSize] = useState<number>(5); //Default to 5 books per page, but the user can change it
  const [pageNumber, setPageNumber] = useState<number>(1); //To keep track of what page number the user is on or wants to go to
  // const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  //useEffect goes and gets the data when it needs to, rather than making requests back to back
  useEffect(
    () => {
      const fetchBooks = async () => {
        //Go look for the data and wait for it to come in. Store it in a variable called "response."
        const response = await fetch(
          `https://localhost:5000/Books/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        //Convert response to json and store in new variable called "data".
        const data = await response.json();
        setBooks(data.books); //update variable "books" with the data we just fetched.
        // setTotalItems(data.totalRecords);
        setTotalPages(Math.ceil(data.totalRecords / pageSize));
      };

      fetchBooks();
    },
    [pageSize, pageNumber] //dependency array to set a watch on pageSize and pageNumber so that when they change, useEffect is called and makes another request to the server.
  );

  return (
    <>
      <h1>Books</h1>
      <br />

      {/* Functionality to sort the books by title */}
      <button
        onClick={() =>
          setBooks([...books].sort((a, b) => a.title.localeCompare(b.title)))
        }
      >
        Sort books by title
      </button>

      <br />
      <br />

      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h1 className="card-title">{b.title}</h1>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <b>Author:</b> {b.author}
              </li>
              <li>
                <b>Publisher:</b> {b.publisher}
              </li>
              <li>
                <b>ISBN:</b> {b.isbn}
              </li>
              <li>
                <b>Classification:</b> {b.classification}
              </li>
              <li>
                <b>Category:</b> {b.category}
              </li>
              <li>
                <b>Page Count:</b> {b.pageCount}
              </li>
              <li>
                <b>Price:</b> ${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      {/* Display page navigation dynamically */}
      <button
        disabled={pageNumber === 1}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous
      </button>

      {/* Dynamically display the buttons to navigate to each page, depending on pageSize and totalPages */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNumber(i + 1)}
          disabled={pageNumber === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Next
      </button>

      <br />

      {/* Option to change the number of results per page */}
      <label>Results per page: </label>
      <select
        value={pageSize}
        onChange={(p) => {
          setPageSize(Number(p.target.value)); //change the value stored in pageSize, triggers useEffect
          setPageNumber(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <br />
    </>
  );
}

export default BookList;
