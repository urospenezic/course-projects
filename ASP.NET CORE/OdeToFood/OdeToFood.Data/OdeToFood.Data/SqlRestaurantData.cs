using Microsoft.EntityFrameworkCore;
using OdeToFood.Core;

namespace OdeToFood.Data;

public class SqlRestaurantData(OdeToFoodDbContext context) : IRestaurantData
{
    private readonly OdeToFoodDbContext _context = context;

    public Restaurant Add(Restaurant newRestaurant)
    {
        _context.Restaurants.Add(newRestaurant);
        return newRestaurant;
    }

    public int Commit()
    {
        return _context.SaveChanges();
    }

    public Restaurant Delete(int id)
    {
        var restaurant = GetById(id);
        if (restaurant != null)
        {
            _context.Restaurants.Remove(restaurant);
        }
        return restaurant ?? new Restaurant();
    }

    public Restaurant GetById(int id)
    {
        return _context.Restaurants.Find(id) ?? new Restaurant();
    }

    public int GetCountOfRestaurants()
    {
        return _context.Restaurants.Count();
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
        var entity = _context.Attach(updatedRestaurant);
        entity.State = EntityState.Modified;
        return updatedRestaurant;
    }
}
