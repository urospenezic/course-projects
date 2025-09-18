using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;

namespace MyApp.Namespace
{
    public class DetailsModel : PageModel
    {
        public required Restaurant Restaurant { get; set; }

        public void OnGet(int restaurantId)
        {
            Restaurant = new Restaurant()
            {
                Id = restaurantId,
                Name = "My Restaurant",
                Cuisine = CuisineType.None,
                Location = "My Location",
            };
        }
    }
}
