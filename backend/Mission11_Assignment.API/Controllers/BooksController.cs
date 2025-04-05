using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Assignment.API.Data;

namespace Mission11_Assignment.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BooksDbContext _booksContext;

        //build an instance of the context file
        public BooksController(BooksDbContext temp) => _booksContext = temp;

        //Route to get all the books and their data
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNumber = 1, [FromQuery] List<string>? bookCategories=null) //pageSize has a backup default value. The first default value is the one specified in React.
        {
            var query = _booksContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category)); //filter out any books that don't match the category that came in
            }


            var totalNumBooks = query.Count();


            var booksList = query
                .Skip((pageNumber - 1) * pageSize) //skips the first x number of records from the books table in the database to get to the right page
                .Take(pageSize) //takes the next pageSize number of records from the books table in the database
                .ToList();

            

            // new object to be able to return 2 things: total number of books (totalNumBooks) and the list of books
            var bookListData = new
            {
                books = booksList,
                totalRecords = totalNumBooks
            };

            return Ok(bookListData);
        }



        //Route to get the book categories for the filter
        [HttpGet("GetBookCategories")]

        public IActionResult GetBookCategories()
        {
            var BookCategories = _booksContext.Books.Select(x => x.Category).Distinct().ToList(); //get all of the book categories

            return Ok(BookCategories); //Ok turns our data into json format and returns the 200 status code.
        }


        //Route to add a book
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook) 
        {
            _booksContext.Books.Add(newBook);
            _booksContext.SaveChanges();
            return Ok(newBook);
        }


        //Route to update a book
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _booksContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _booksContext.Books.Update(existingBook);
            _booksContext.SaveChanges();
            return Ok(existingBook);
        }


        //Route to delete a book
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
           var book = _booksContext.Books.Find(bookID);

           if (book == null)
           {
            return NotFound(new {message = "Book not found."});
           }

           _booksContext.Remove(book);
           _booksContext.SaveChanges();
           return NoContent();
        }


    }
}
