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
        public IEnumerable<Book> GetBooks()
        {
            var books = _booksContext.Books.ToList();
            return books;
        }
        
        
    }
}
