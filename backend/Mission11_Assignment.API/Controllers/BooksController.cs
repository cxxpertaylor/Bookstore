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

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize=5, int pageNumber=1) //pageSize has a backup default value. The first default value is the one specified in React.
        {

            string? favGenre = Request.Cookies["FavoriteGenre"];
            Console.WriteLine("~~~~~~~~COOKIE~~~~~~~~~~\n" + favGenre);

            HttpContext.Response.Cookies.Append("FavoriteGenre", "Biography", new CookieOptions
            {
                HttpOnly = true, //This means that this cookie can only be seen by the server. Not accessible to JavaScript or the DOM. This is for security.
                Secure = true, //The cookie will only be transmitted over HTTPS
                SameSite = SameSiteMode.Strict, //limits whether we are allowed to have cookies from different sites. Strict means no
                Expires = DateTime.Now.AddMinutes(1), //expires and refreshes after every minute
            });


            var booksList = _booksContext.Books
                .Skip((pageNumber - 1) * pageSize) //skips the first x number of records from the books table in the database to get to the right page
                .Take(pageSize) //takes the next pageSize number of records from the books table in the database
                .ToList();

            var totalNumBooks = _booksContext.Books.Count();

            // new object to be able to return 2 things: total number of books (totalNumBooks) and the list of books
            var bookListData = new
            {
                books = booksList,
                totalRecords = totalNumBooks
            };

            return Ok(bookListData);
        }
        
        
    }
}
