using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood.Pages
{
    public class ListModel(IConfiguration config, IRestaurantData restaurantData) : PageModel
    {
        private readonly IConfiguration _config = config;
        private readonly IRestaurantData _restaurantData = restaurantData;

        [BindProperty(SupportsGet = true)]
        public string SearchTerm { get; set; } = string.Empty;

        public required string Message { get; set; }
        public IEnumerable<Restaurant>? Restaurants { get; set; }

        // responds to GET request
        public void OnGet() //string search = null
        {
            //Message = _config["Message"];//check appsettings.json
            Restaurants = _restaurantData.GetRestaurantsByName(SearchTerm);
        }
    }
}
