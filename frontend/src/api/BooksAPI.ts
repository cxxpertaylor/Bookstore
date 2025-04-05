import { Book } from '../types/Book';

interface FetchBooksResponse {
  totalRecords: number;
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://localhost:5000/Books';

export const fetchBooks = async (
  pageSize: number,
  pageNumber: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    //dynamically build variable of selected categories to insert into url for query.
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');

    //Go look for the data and wait for it to come in. Store it in a variable called "response."
    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    //error handling in case the books can't get fetched.
    if (!response.ok) {
      throw new Error('Failed to fetch books.');
    }
    //Convert response to json and store in new variable called "data".
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book: ', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book: ', error);
    throw error;
  }
};
