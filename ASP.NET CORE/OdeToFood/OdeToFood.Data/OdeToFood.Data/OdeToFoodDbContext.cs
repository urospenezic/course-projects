using Microsoft.EntityFrameworkCore;
using OdeToFood.Core;

namespace OdeToFood.Data;

public class OdeToFoodDbContext(DbContextOptions<OdeToFoodDbContext> options) : DbContext(options)
{
    public DbSet<Restaurant> Restaurants { get; set; }
}
