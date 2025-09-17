using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood.Pages
{
    public class ListModel(IConfiguration config, IRestaurantData restaurantData) : PageModel
    {
        private readonly IConfiguration _config = config;
        private readonly IRestaurantData _restaurantData = restaurantData;

        public required string Message { get; set; }
        public IEnumerable<Restaurant>? Restaurants { get; set; }

        // responds to GET request
        public void OnGet()
        {
            Message = _config["Message"];//check appsettings.json
            Restaurants = _restaurantData.GetAll();
        }
    }
}
