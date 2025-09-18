using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;
using OdeToFood.Data;

namespace MyApp.Namespace
{
    public class DetailsModel(IRestaurantData restaurantData) : PageModel
    {
        private readonly IRestaurantData _restaurantData = restaurantData;

        public required Restaurant Restaurant { get; set; }

        public IActionResult OnGet(int restaurantId)
        {
            Restaurant = _restaurantData.GetById(restaurantId);
            if (Restaurant == null)
            {
                return RedirectToPage("./NotFound");
            }
            return Page();
        }
    }
}
