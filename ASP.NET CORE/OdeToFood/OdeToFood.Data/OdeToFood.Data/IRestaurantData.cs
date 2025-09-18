using OdeToFood.Core;

namespace OdeToFood.Data;

public interface IRestaurantData
{
    IEnumerable<Restaurant> GetRestaurantsByName(string name);

    Restaurant GetById(int id);
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

    public Restaurant GetById(int id)
    {
        return _restaurants.FirstOrDefault(r => r.Id == id);
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
}
