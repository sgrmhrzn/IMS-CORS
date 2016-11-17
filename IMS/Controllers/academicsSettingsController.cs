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

        /***
        * 
        * 
        * 
        * **/
        #region Start department
        [Route("getDepartment")]
        [HttpGet]
        public IEnumerable<DEPARTMENT> getDept()
        {
            return db.departments.AsEnumerable();
        }

        [Route("getDepById")]
        [HttpGet]
        public DEPARTMENT getDeptById(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.departments.Where(x => x.DEPTID == no).FirstOrDefault();
            return byId;
        }

        [Route("addDepartment")]
        [HttpPost]
        public string addDepartment(DEPARTMENT dept)
        {
            if (dept != null)
            {
                db.departments.Add(dept);
                db.SaveChanges();
                return "Department Added!";
            }
            else
            {
                return "Invalid Department!";
            }
        }

        [Route("updateDept")]
        [HttpPost]
        public string updateDepartment(DEPARTMENT dept)
        {
            if (dept != null)
            {
                var byId = db.departments.Where(x => x.DEPTID == dept.DEPTID).FirstOrDefault();
                byId.DEPTNAME = dept.DEPTNAME;
                db.SaveChanges();
                return "Department Updated!";
            }
            else
            {
                return "Invalid Department!";
            }
        }

        [Route("deleteDept")]
        [HttpPost]
        public string Delete(DEPARTMENT dept)
        {
            int no = Convert.ToInt32(dept.DEPTID);
            var record = db.departments.Where(x => x.DEPTID == no).FirstOrDefault();
            db.departments.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
        #endregion Department
        /***
        * 
        * 
        * 
        * **/

        #region start student Category

        [Route("getCategory")]
        [HttpGet]
        public IEnumerable<Std_Category> getCategory()
        {
            return db.stdCategroy.AsEnumerable();
        }

        [Route("getCategory/{id}")]
        [HttpGet]
        public Std_Category getCategoryById(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.stdCategroy.Where(x => x.ID == no).FirstOrDefault();
            return byId;
        }

        [Route("addCategory")]
        [HttpPost]
        public string addBatch(Std_Category category)
        {
            if (category != null)
            {
                db.stdCategroy.Add(category);
                db.SaveChanges();
                return "Category Added!";
            }
            else
            {
                return "Invalid Category!";
            }
        }

        [Route("updateCategory")]
        [HttpPost, HttpGet]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public string updateBatch(Std_Category category)
        {
            if (category != null)
            {
                var byId = db.stdCategroy.Where(x => x.ID == category.ID).FirstOrDefault();
                byId.Category = category.Category;

                db.SaveChanges();
                return "Category Updated!";
            }
            else
            {
                return "Invalid Category!";
            }
        }

        [Route("delteCategory")]
        [HttpPost]
        public string Delete(Std_Category category)
        {
            int no = Convert.ToInt32(category.ID);
            var record = db.stdCategroy.Where(x => x.ID == no).FirstOrDefault();
            db.stdCategroy.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
        #endregion end student Category


        /***
        * 
        * 
        * 
        * **/

        #region start Batch

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
            if (batch != null)
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

        [Route("updateBatch")]
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
#endregion end batch

        /***
        * 
        * 
        * 
        * **/

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

        [Route("updateCourse")]
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

        #endregion course

        /***
         * 
         * 
         * 
         * **/
        #region Start class

        [Route("getClass")]
        [HttpGet]
        public IEnumerable<CLASS> getClass()
        {
            return db.classes.AsEnumerable();
        }

        [Route("getClass/{id}")]
        [HttpGet]
        public CLASS getClassById(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.classes.Find(no);
            return byId;
        }

        [Route("addClass")]
        [HttpPost]
        public string addClass(CLASS clas)
        {
            if (clas != null)
            {
                db.classes.Add(clas);
                db.SaveChanges();
                return "Class Added!";
            }
            else
            {
                return "Invalid Class!";
            }
        }

        [Route("updateClass")]
        [HttpPost]
        public string updateClass(CLASS clas)
        {
            if (clas != null)
            {
                var byId = db.classes.Where(x => x.CLASSNO == clas.CLASSNO).FirstOrDefault();
                byId.CLASSTEACHER = clas.CLASSTEACHER;

                db.SaveChanges();
                return "Class Updated!";
            }
            else
            {
                return "Invalid Class!";
            }
        }

        [Route("deleteClass")]
        [HttpPost]
        public string delteClass(CLASS clas)
        {
            int no = Convert.ToInt32(clas.CLASSNO);
            var record = db.classes.Where(x => x.CLASSNO == no).FirstOrDefault();
            db.classes.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
        #endregion class

        /***
        * 
        * 
        * 
        * **/
    }
}