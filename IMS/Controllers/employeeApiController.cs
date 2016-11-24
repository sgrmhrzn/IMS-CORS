using IMS.Core;
using IMS.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace IMS.Controllers
{
    [EnableCorsAttribute("http://localhost:50922", "*", "*")]
    [Authorize()]
    [RoutePrefix("api/employeeApi")]
    public class employeeApiController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        // GET: api/Test
        public IEnumerable<EMPLOYEE> Get()
        {
            //return new string[] { "value1", "value2" };
            return db.employee.Include("departments").AsEnumerable();
        }

        // GET: api/Test/5
        public EMPLOYEE Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.employee.Include("departments").Where(x => x.EmpID == no).FirstOrDefault();
            return byId;
        }

        [Route("add")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public HttpResponseMessage Post(EMPLOYEE emp)
        {
            string base64Data = Convert.ToString(emp.base64);
            //var data = base64Data.Substring(base64Data.IndexOf("," + 1));
            //byte[] imageBytes = Convert.FromBase64String(data);
            //MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            if (emp.base64 != "null")
            {
                base64ToByte baseBytes = new base64ToByte();
                emp.Photo = baseBytes.image(300, 300, base64Data);
            }

            db.employee.Add(emp);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Added!");
        }

        [Route("update/{id}")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string Put(EMPLOYEE emp)
        {
            if (emp != null)
            {
                int no = Convert.ToInt32(emp.EmpID);
                var getEmployee = db.employee.Where(x => x.EmpID == no).FirstOrDefault();
                getEmployee.NAME = emp.NAME;
                getEmployee.PHONE_NO = emp.PHONE_NO;
                getEmployee.EMAIL = emp.EMAIL;
                getEmployee.MOBILE_NO = emp.MOBILE_NO;
                getEmployee.DESIGNATION = emp.DESIGNATION;
                getEmployee.PERMANENT_ADDRESS = emp.PERMANENT_ADDRESS;
                getEmployee.TEMP_ADDRESS = emp.TEMP_ADDRESS;
                getEmployee.DOB = emp.DOB;
                getEmployee.TEACHER_OR_NONTEACHER = emp.TEACHER_OR_NONTEACHER;
                getEmployee.NATIONAL_ID_NO = emp.NATIONAL_ID_NO;
                getEmployee.MARITAL_STATUS = emp.MARITAL_STATUS;
                getEmployee.GENDER = emp.GENDER;
                getEmployee.QUALIFICATION = emp.QUALIFICATION;
                getEmployee.DEPTID = emp.DEPTID;

                if (emp.base64 != "null")
                {
                    string base64Data = Convert.ToString(emp.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    getEmployee.Photo = baseBytes.image(300, 300, base64Data);
                }

                db.SaveChanges();
                return "Updated!";
            }
            else
            {
                return "Some error occured while updating the record!";
            }
        }

        // DELETE: api/Test/5
        [Route("delete")]
        [HttpPost]
        public string Delete(EMPLOYEE emp)
        {
            int no = Convert.ToInt32(emp.EmpID);
            var record = db.employee.Include("contact_detail").Where(x => x.EmpID == no).FirstOrDefault();
            db.employee.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }

        /**
        * STUDENT ATTENDANCE API START
        * 
        * */
        #region start employee attendance

        [Route("getAttendance")]
        [HttpGet]
        public IEnumerable<EmpAttendance> getAttendance()
        {
            //return new string[] { "value1", "value2" };
            return db.empAttendance.Include("employee").AsEnumerable();
        }

        [Route("addAttendance")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string attendanceEntry(EmpAttendance empAttend)
        {
            int checkAttendance = db.empAttendance.Where(e => e.DateOfAttendance == empAttend.DateOfAttendance && e.EmpID == empAttend.EmpID).Select(x => x.EmpID).Count();
            int checkEmployee = db.employee.Where(e => e.EmpID == empAttend.EmpID).Count();
            var message = "";

            if (checkEmployee == 0)
            {
                message = "Employee doesnot exist!";
            }
            else
            {
                switch (checkAttendance)
                {
                    case 0:
                        empAttend.TimeIn = empAttend.time;
                        empAttend.STATUS = "IN";
                        db.empAttendance.Add(empAttend);
                        db.SaveChanges();
                        message = "In Recorded!";
                        break;

                    case 1:
                        empAttend.TimeOut = empAttend.time;
                        empAttend.STATUS = "OUT";
                        db.empAttendance.Add(empAttend);
                        db.SaveChanges();
                        message = "Out Recorded!";
                        break;

                    case 2:
                        message = "Already Recorded!";
                        break;
                }
            }
            return message;
        }

        [Route("getStudentByClass/{Class}")]
        [HttpGet]
        public List<Student> getStudentsById(string Class)
        {
            int getClass = Convert.ToInt32(Class);
            return db.students.Where(s => s.CLASS == getClass).AsEnumerable().Select(s => new Student { NAME = s.NAME }).ToList();
        }
        #endregion end employee attendance





        #region start Teachers Time Table

        [Route("timeTable")]
        public IEnumerable<TeacherTimeTable> getTimeTable()
        {
            //return new string[] { "value1", "value2" };
            return db.TtimeTable.AsEnumerable();
        }

        // GET: api/Test/5
        [Route("timeTable/{id}")]
        public TeacherTimeTable getById(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.TtimeTable.Where(x => x.ID == no).FirstOrDefault();
            return byId;
        }

        [Route("timeTableAdd")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public HttpResponseMessage addTTT(TeacherTimeTable TTT)
        {
            db.TtimeTable.Add(TTT);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Added!");
        }

        [Route("timeTableUpdate")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string updateTTT(TeacherTimeTable TTT)
        {
            if (TTT != null)
            {
                int no = Convert.ToInt32(TTT.ID);
                var timeTable = db.TtimeTable.Where(x => x.ID == no).FirstOrDefault();
                timeTable.ClassRoom_ID = TTT.ClassRoom_ID;
                timeTable.DayOfTheWeek = TTT.DayOfTheWeek;
                timeTable.StartTime = TTT.StartTime;
                timeTable.EndTime = TTT.EndTime;
                timeTable.Lecture_ID = TTT.Lecture_ID;

                db.SaveChanges();
                return "Updated!";
            }
            else
            {
                return "Some error occured while updating the record!";
            }
        }

        // DELETE: api/Test/5
        [Route("timeTableDelete")]
        [HttpPost]
        public string TTTDelete(TeacherTimeTable TTT)
        {
            int no = Convert.ToInt32(TTT.ID);
            var record = db.TtimeTable.Where(x => x.ID == no).FirstOrDefault();
            db.TtimeTable.Remove(record);
            db.SaveChanges();
            return "Deleted!";
        }
        #endregion end of timeTable
    }
}
