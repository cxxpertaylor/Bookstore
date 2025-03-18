using Microsoft.EntityFrameworkCore;

namespace Mission11_Assignment.API.Data
{
    public class BooksDbContext : DbContext
    {
        public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options) { } //Constructor

        public DbSet<Book> Books { get; set; } //Set up a set of Books (from Book.cs) to make up the Books table in the Database
    }
}
