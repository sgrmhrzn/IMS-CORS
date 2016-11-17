using IMS.Core;
using IMS.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace IMS.Controllers
{
    [RoutePrefix("api/academics")]
    public class academicsSettingsController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        [Route("getBatch")]
        [HttpGet]
        public IEnumerable<BatchCreation> get()
        {
            return db.batches.AsEnumerable();
        }

        [Route("getBatch/{id}")]
        [HttpGet]
        public BatchCreation Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.batches.Where(x => x.ID == no).FirstOrDefault();
            return byId;
        }

        [Route("addBatch")]
        [HttpPost]
        public string addBatch(BatchCreation batch)
        {
            if (batch != null )
            {
                db.batches.Add(batch);
                db.SaveChanges();
                return "Batch Added!";
            }
            else
            {
                return "Invalid Batch!";
            }
        }

        [Route("updateBatch/{id}")]
        [HttpPost, HttpGet]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public string updateBatch(BatchCreation batch)
        {
            if (batch != null)
            {
                var byId = db.batches.Where(x => x.ID == batch.ID).FirstOrDefault();
                byId.Section = batch.Section;
                byId.Class = batch.Class;
                byId.BatchName = batch.BatchName;
                byId.MaxNoOfStds = batch.MaxNoOfStds;
               
                db.SaveChanges();
                return "Department Updated!";
            }
            else
            {
                return "Invalid Department!";
            }
        }

        [Route("deleteBatch")]
        [HttpPost]
        public string Delete(BatchCreation batch)
        {
            int no = Convert.ToInt32(batch.ID);
            var record = db.batches.Where(x => x.ID == no).FirstOrDefault();
            db.batches.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }


#region course Start

        [Route("getCourse")]
        [HttpGet]
        public IEnumerable<Courses> getCourses()
        {
            return db.courses.AsEnumerable();
        }

        [Route("getCourse/{id}")]
        [HttpGet]
        public Courses getCoursesById(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.courses.Find(no);
            return byId;
        }

        [Route("addCourse")]
        [HttpPost]
        public string addCourse(Courses course)
        {
            if (course != null)
            {
                db.courses.Add(course);
                db.SaveChanges();
                return "course Added!";
            }
            else
            {
                return "Invalid course!";
            }
        }

        [Route("updateCourse/{id}")]
        [HttpPost]
        public string updateCourse(Courses course)
        {
            if (course != null)
            {
                var byId = db.courses.Where(x => x.CourseID == course.CourseID).FirstOrDefault();
                byId.ClassNo = course.ClassNo;
                byId.CourseInstructor1 = course.CourseInstructor1;
                byId.CourseInstructor2 = course.CourseInstructor2;
                byId.CourseInstructor3 = course.CourseInstructor3;
                byId.CourseLevel = course.CourseLevel;
                byId.CourseName = course.CourseName;

                db.SaveChanges();
                return "Course Updated!";
            }
            else
            {
                return "Invalid Course!";
            }
        }

        [Route("deleteCourse")]
        [HttpPost]
        public string DeleteCourse(Courses course)
        {
            int no = Convert.ToInt32(course.CourseID);
            var record = db.courses.Where(x => x.CourseID == no).FirstOrDefault();
            db.courses.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
    }
    #endregion course
}