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
            var byId = db.employee.Include("departments").Where(x => x.ID == no).FirstOrDefault();
            return byId;
        }

        [Route("api/employeeApi/add")]
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

        [Route("api/employeeApi/update/{id}")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string Put(EMPLOYEE emp)
        {
            if (emp != null)
            {
                int no = Convert.ToInt32(emp.ID);
                var getEmployee = db.employee.Where(x => x.ID == no).FirstOrDefault();
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
        [Route("api/Test/delete/{id}")]
        [HttpPost]
        public string Delete(EMPLOYEE emp)
        {
            int no = Convert.ToInt32(emp.ID);
            var record = db.employee.Include("contact_detail").Where(x => x.ID == no).FirstOrDefault();
            db.employee.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
    }
}
