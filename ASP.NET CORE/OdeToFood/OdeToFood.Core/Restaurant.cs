using System;
using System.Collections.Generic;
using System.Text;

namespace OdeToFood.Core
{
    public class Restaurant
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public CuisineType Cuisine { get; set; }
        public string Location { get; set; } = string.Empty;
    }
}
