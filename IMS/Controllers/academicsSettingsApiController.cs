using IMS.Core;
using IMS.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IMS.Controllers
{
    public class academicsSettingsApiController : ApiController
    {
        // GET: api/academicsSettingsApi
        private AbDataContext db = new AbDataContext();

        [Route("api/academicsSett/getCourses")]
        [HttpGet]
        public IEnumerable<Courses> get()
        {
            return db.courses.AsEnumerable();
        }

        [Route("api/academicsSett/getCourseById")]
        [HttpGet]
        public Courses Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.courses.Where(x => x.CourseID == no).FirstOrDefault();
            return byId;
        }

        [Route("api/academicsSett/addCourse")]
        [System.Web.Http.AcceptVerbs("POST")]
        [HttpPost]
        public string addCourse(Courses course)
        {
            if (course != null)
            {
                db.courses.Add(course);
                db.SaveChanges();
                return "Course Added!";
            }
            else
            {
                return "Invalid Course!";
            }
        }

        // PUT: api/academicsSettingsApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/academicsSettingsApi/5
        public void Delete(int id)
        {
        }
    }
}
