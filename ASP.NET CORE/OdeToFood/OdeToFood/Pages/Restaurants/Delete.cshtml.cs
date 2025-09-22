using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;
using OdeToFood.Data;

namespace MyApp.Namespace
{
    public class DeleteModel(IRestaurantData restaurantData) : PageModel
    {
        private readonly IRestaurantData _restaurantData = restaurantData;

        public Restaurant Restaurant { get; set; }

        public IActionResult OnGet(int restaurantId)
        {
            var restaurant = _restaurantData.GetById(restaurantId);
            if (restaurant == null)
            {
                return RedirectToPage("./NotFound");
            }
            Restaurant = restaurant;
            return Page();
        }

        public IActionResult OnPost(int restaurantId)
        {
            var restaurant = _restaurantData.Delete(restaurantId);
            _restaurantData.Commit();

            if (restaurant == null)
            {
                return RedirectToPage("./NotFound");
            }

            TempData["Message"] = "Restaurant deleted!";
            return RedirectToPage("./List");
        }
    }
}
