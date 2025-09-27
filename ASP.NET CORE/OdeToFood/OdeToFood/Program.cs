using Microsoft.EntityFrameworkCore;
using OdeToFood.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers(); // Add API Controllers support
builder.Services.AddDbContextPool<OdeToFoodDbContext>(options =>
{
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("OdeToFood.Data")
    );
});
builder.Services.AddScoped<IRestaurantData, SqlRestaurantData>();

var app = builder.Build();

MigrateDatabase();

void MigrateDatabase()
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<OdeToFoodDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

// Serve static files from node_modules in development
if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles(
        new StaticFileOptions
        {
            FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "node_modules")
            ),
            RequestPath = "/node_modules",
        }
    );

    app.UseDeveloperExceptionPage();
}

app.UseRouting();

app.UseAuthorization();
app.Use(SayHelloMiddleware); //simulate middleware
app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();
app.MapControllers(); // Map API Controllers

RequestDelegate SayHelloMiddleware(RequestDelegate @delegate)
{
    return async context =>
    {
        if (context.Request.Path.StartsWithSegments("/hello"))
        {
            await context.Response.WriteAsync("Hello, World!");
        }
        else
        {
            await @delegate(context);
        }
    };
}

app.Run();
