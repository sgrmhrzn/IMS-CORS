using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    public class EmployeeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Employee Details";

            return View();
        }
        public ActionResult profile()
        {
            return View();
        }
    }
}
