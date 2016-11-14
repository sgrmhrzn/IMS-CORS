using IMS.Core;
using IMS.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace IMS.Controllers
{
    [EnableCorsAttribute("http://localhost:63492", "*", "*")]
    public class employeeSettingsApiController : ApiController
    {
        private AbDataContext db = new AbDataContext();

        [Route("api/empSettings/getDepartment")]
        [HttpGet]
        public IEnumerable<DEPARTMENT> get()
        {
            return db.departments.AsEnumerable();
        }

        [Route("api/empSettings/getDepById")]
        [HttpGet]
        public DEPARTMENT Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.departments.Where(x => x.DEPTID == no).FirstOrDefault();
            return byId;
        }

        [Route("api/empSettings/addDepartment")]
        [HttpPost]
        public string addDepartment(DEPARTMENT dept)
        {
            if (dept != null )
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

        [Route("api/empSettings/updateDept")]
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

        [Route("api/empSettings/deleteDept")]
        [HttpPost]
        public string Delete(DEPARTMENT dept)
        {
            int no = Convert.ToInt32(dept.DEPTID);
            var record = db.departments.Where(x => x.DEPTID == no).FirstOrDefault();
            db.departments.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
    }
}