using Microsoft.EntityFrameworkCore;
using OdeToFood.Core;

namespace OdeToFood.Data;

public class SqlRestaurantData : IRestaurantData
{
    private readonly OdeToFoodDbContext _context;

    public SqlRestaurantData(OdeToFoodDbContext context)
    {
        _context = context;
    }

    public Restaurant Add(Restaurant newRestaurant)
    {
        _context.Restaurants.Add(newRestaurant);
        return newRestaurant;
    }

    public int Commit()
    {
        return _context.SaveChanges();
    }

    public Restaurant GetById(int id)
    {
        return _context.Restaurants.Find(id) ?? new Restaurant();
    }

    public IEnumerable<Restaurant> GetRestaurantsByName(string name)
    {
        var query =
            from restaurant in _context.Restaurants
            where string.IsNullOrEmpty(name) || restaurant.Name.StartsWith(name)
            orderby restaurant.Name
            select restaurant;

        return query;
    }

    public Restaurant Update(Restaurant updatedRestaurant)
    {
        var entity = _context.Entry(updatedRestaurant);
        entity.State = EntityState.Modified;
        return updatedRestaurant;
    }
}
