using Microsoft.EntityFrameworkCore;
using Mission11_Assignment.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BooksDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

builder.Services.AddCors( options => 
    options.AddPolicy("AllowReactApp", 
    policy => {
        policy.WithOrigins("http://localhost:3000", "https://polite-river-0caf9d11e.6.azurestaticapps.net")
        .AllowAnyMethod()
        .AllowAnyHeader();
    })); // Use cors, which allows us to get requests from specific origins.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
