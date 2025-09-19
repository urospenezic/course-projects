using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using OdeToFood.Core;
using OdeToFood.Data;

namespace MyApp.Namespace
{
    public class EditModel(IRestaurantData restaurantData, IHtmlHelper htmlHelper) : PageModel
    {
        private readonly IRestaurantData _restaurantData = restaurantData;
        private readonly IHtmlHelper _htmlHelper = htmlHelper;

        [BindProperty]
        public required Restaurant Restaurant { get; set; }

        public IEnumerable<SelectListItem> CuisineOptions { get; set; } = [];

        public IActionResult OnGet(int? restaurantId)
        {
            if (restaurantId.HasValue)
            {
                Restaurant = _restaurantData.GetById(restaurantId.Value);
            }
            else
            {
                Restaurant = new Restaurant();
            }

            CuisineOptions = _htmlHelper.GetEnumSelectList<CuisineType>();

            if (Restaurant == null)
            {
                return RedirectToPage("./NotFound");
            }

            return Page();
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                CuisineOptions = _htmlHelper.GetEnumSelectList<CuisineType>();
                return Page();
            }

            if (Restaurant.Id > 0)
            {
                Restaurant = _restaurantData.Update(Restaurant);
            }
            else
            {
                Restaurant = _restaurantData.Add(Restaurant);
            }

            _restaurantData.Commit();

            return RedirectToPage("./Details", new { restaurantId = Restaurant.Id });
        }
    }
}
