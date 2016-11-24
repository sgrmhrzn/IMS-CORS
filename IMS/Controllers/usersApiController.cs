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
    public class usersApiController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        // GET: api/Test
        public IEnumerable<Users> Get()
        {
            //return new string[] { "value1", "value2" };
            return db.userAccounts.AsEnumerable();
        }

        // GET: api/Test/5
        public Users Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.userAccounts.Where(x => x.UserID == no).FirstOrDefault();
            return byId;
        }

        [Route("api/usersApi/add")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        public HttpResponseMessage Post(Users user)
        {
            db.userAccounts.Add(user);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Added!");
        }

        [Route("api/usersApi/update/{id}")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string Put(Users user)
        {
            if (user != null)
            {
                int no = Convert.ToInt32(user.UserID);
                var getRecord = db.userAccounts.Where(x => x.UserID == no).FirstOrDefault();
                getRecord.UserName = user.UserName;
                getRecord.UserPassword = user.UserPassword;
                getRecord.NAME = user.NAME;
                getRecord.AccessRole = user.AccessRole;
                getRecord.MasterID = user.MasterID;

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
            int no = Convert.ToInt32(emp.EmpID);
            var record = db.userAccounts.Include("contact_detail").Where(x => x.UserID == no).FirstOrDefault();
            db.userAccounts.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }

        [Route("api/usersApi/updateByMasterID")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string updateByMasterID(Users user)
        {
            if (user != null)
            {
                string no = user.MasterID;
                var getRecord = db.userAccounts.Where(x => x.MasterID == no).FirstOrDefault();
                getRecord.UserName = user.UserName;
                getRecord.NAME = user.NAME;

                if (user.UserPassword != null)
                {
                    getRecord.UserPassword = user.UserPassword;
                }

                db.SaveChanges();
                return "Updated!";
            }
            else
            {
                return "Some error occured while updating the record!";
            }
        }
    }
}
