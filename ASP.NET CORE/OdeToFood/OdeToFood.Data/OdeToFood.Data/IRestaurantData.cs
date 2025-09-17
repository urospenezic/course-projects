using OdeToFood.Core;

namespace OdeToFood.Data;

public interface IRestaurantData
{
    IEnumerable<Restaurant> GetAll();
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

    public IEnumerable<Restaurant> GetAll()
    {
        return _restaurants.OrderBy(r => r.Name);
    }
}
