using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace E_shop.Controllers
{
    public class AccordionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}