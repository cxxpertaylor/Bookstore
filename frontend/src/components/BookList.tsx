import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]); //Set an array of books
  const [pageSize, setPageSize] = useState<number>(5); //Default to 5 books per page, but the user can change it
  const [pageNumber, setPageNumber] = useState<number>(1); //To keep track of what page number the user is on or wants to go to
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate(); //variable for navigation
  const [error, setError] = useState<string | null>(null); //variable to hold error messages
  const [loading, setLoading] = useState(true); //variable to keep track of when the books are loading

  //useEffect goes and gets the data when it needs to, rather than making requests back to back
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          //the API call is happening here.
          pageSize,
          pageNumber,
          selectedCategories
        );
        setBooks(data.books); //update variable "books" with the data we just fetched.
        setTotalPages(Math.ceil(data.totalRecords / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks(); //call loadBooks, which makes the API call
  }, [pageSize, pageNumber, selectedCategories]); //dependency array to set a watch on pageSize, pageNumber, and selectedCategories so that when they change, useEffect is called and makes another request to the server.
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {/* Functionality to sort the books by title */}
      <button
        className="btn btn-outline-primary"
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
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/cartConfirm/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNumber}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNumber(1);
        }}
      />
    </>
  );
}

export default BookList;
