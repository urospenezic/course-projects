using Microsoft.AspNetCore.Mvc;
using OdeToFood.Data;

namespace OdeToFood.ViewComponents
{
    public class RestaurantCount(IRestaurantData restaurantData) : ViewComponent
    {
        private readonly IRestaurantData _restaurantData = restaurantData;

        public IViewComponentResult Invoke()
        {
            var count = _restaurantData.GetCountOfRestaurants();
            return View(count);
        }
    }
}
