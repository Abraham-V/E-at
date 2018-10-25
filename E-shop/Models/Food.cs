using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_shop.Models
{
    public class Food
    {
        public float Lat { get; set; }

        public float Lon { get; set; }

        public string[] FoodList { get; set; }

        public float[] Price { get; set; }

    }
}
