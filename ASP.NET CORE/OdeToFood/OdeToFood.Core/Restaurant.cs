using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OdeToFood.Core
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string Name { get; set; } = string.Empty;
        public CuisineType Cuisine { get; set; }

        [Required, StringLength(255)]
        public string Location { get; set; } = string.Empty;
    }
}
