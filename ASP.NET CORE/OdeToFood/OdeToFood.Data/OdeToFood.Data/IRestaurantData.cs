using OdeToFood.Core;

namespace OdeToFood.Data;

public interface IRestaurantData
{
    IEnumerable<Restaurant> GetRestaurantsByName(string name);

    Restaurant GetById(int id);

    Restaurant Update(Restaurant updatedRestaurant);

    int Commit();

    Restaurant Add(Restaurant newRestaurant);

    Restaurant Delete(int id);
}

public class InMemoryRestaurantData : IRestaurantData
{
    private readonly List<Restaurant> _restaurants;

    public InMemoryRestaurantData()
    {
        _restaurants =
        [
            new()
            {
                Id = 1,
                Name = "Scott's Pizza",
                Cuisine = CuisineType.Italian,
                Location = "Maryland",
            },
            new()
            {
                Id = 2,
                Name = "Cinnamon Club",
                Cuisine = CuisineType.Indian,
                Location = "London",
            },
            new()
            {
                Id = 3,
                Name = "La Costa",
                Cuisine = CuisineType.Mexican,
                Location = "California",
            },
        ];
    }

    public Restaurant Add(Restaurant newRestaurant)
    {
        _restaurants.Add(newRestaurant);
        newRestaurant.Id = _restaurants.Max(r => r.Id) + 1;
        return newRestaurant;
    }

    public int Commit() => 0;

    public Restaurant Delete(int id)
    {
        var resturant = _restaurants.FirstOrDefault(r => r.Id == id);
        if (resturant != null)
        {
            _restaurants.Remove(resturant);
        }

        return resturant ?? new Restaurant();
    }

    public Restaurant GetById(int id)
    {
        return _restaurants.FirstOrDefault(r => r.Id == id) ?? new Restaurant();
    }

    public IEnumerable<Restaurant> GetRestaurantsByName(string? name = null)
    {
        var query = _restaurants.Where(restaurant =>
        {
            return string.IsNullOrEmpty(name)
                || restaurant.Name.StartsWith(name, StringComparison.OrdinalIgnoreCase);
        });

        return query.OrderBy(restaurant => restaurant.Name);
    }

    public Restaurant Update(Restaurant updatedRestaurant)
    {
        var restaurant = GetById(updatedRestaurant.Id);
        if (restaurant != null)
        {
            restaurant.Name = updatedRestaurant.Name;
            restaurant.Location = updatedRestaurant.Location;
            restaurant.Cuisine = updatedRestaurant.Cuisine;
        }

        return restaurant ?? new Restaurant();
    }
}
