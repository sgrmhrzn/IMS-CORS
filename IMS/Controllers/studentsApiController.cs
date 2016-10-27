using IMS.Core;
using IMS.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IMS.Controllers
{
    public class studentsApiController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        // GET: api/Test
        public IEnumerable<Student> Get()
        {
            //return new string[] { "value1", "value2" };
            return db.students.Include("studentDetails").AsEnumerable();
        }

        // GET: api/Test/5
        public Student Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.students.Include("studentDetails").Where(x => x.StdID == no).FirstOrDefault();
            return byId;
        }

        [Route("api/studentsApi/add")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public HttpResponseMessage Post(Student std)
        {
            string base64Data = Convert.ToString(std.base64);
            //var data = base64Data.Substring(base64Data.IndexOf("," + 1));
            //byte[] imageBytes = Convert.FromBase64String(data);
            //MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            if (std.base64 != "null")
            {
                base64ToByte baseBytes = new base64ToByte();
                std.Photo = baseBytes.image(300, 300, base64Data);
            }

            db.students.Add(std);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Added!");
        }

        [Route("api/studentsApi/update/{id}")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string Put(Student std)
        {
            if (std != null)
            {
                int no = Convert.ToInt32(std.StdID);
                var getStudents = db.students.Where(x => x.StdID == no).FirstOrDefault();
                getStudents.NAME = std.NAME;
                getStudents.PHONENO = std.PHONENO;
                getStudents.CLASS = std.CLASS;
                getStudents.ADDRESS = std.ADDRESS;
                getStudents.GENDER = std.GENDER;
                getStudents.NATIONALITY = std.NATIONALITY;
                getStudents.ENROLLEDYEAR = std.ENROLLEDYEAR;
                getStudents.Category = std.Category;
                getStudents.DOB = std.DOB;
                getStudents.studentDetails.GUARDIAN_PHONE_NO = std.studentDetails.GUARDIAN_PHONE_NO;
                getStudents.studentDetails.MOBILE_NO = std.studentDetails.MOBILE_NO;
                getStudents.studentDetails.First_NAME = std.studentDetails.First_NAME;
                getStudents.studentDetails.Last_Name = std.studentDetails.Last_Name;
                getStudents.studentDetails.Relation = std.studentDetails.Relation;
                getStudents.studentDetails.Education = std.studentDetails.Education;
                getStudents.studentDetails.Occupation = std.studentDetails.Occupation;
                getStudents.studentDetails.Income = std.studentDetails.Income;
                getStudents.studentDetails.Email = std.studentDetails.Email;
                getStudents.studentDetails.AddLine1 = std.studentDetails.AddLine1;
                getStudents.studentDetails.AddLine2 = std.studentDetails.AddLine2;
                getStudents.studentDetails.State = std.studentDetails.State;
                getStudents.studentDetails.Country = std.studentDetails.Country;

                if (std.base64 != "null")
                {
                    string base64Data = Convert.ToString(std.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    getStudents.Photo = baseBytes.image(300, 300, base64Data);
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
        [Route("api/studentsApi/delete/{id}")]
        [HttpPost]
        public string Delete(Student std)
        {
            int no = Convert.ToInt32(std.StdID);
            var record = db.students.Include("studentDetails").Where(x => x.StdID == no).FirstOrDefault();
            db.students.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
    }
}
