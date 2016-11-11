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
    public class adminSettingsController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        // GET: api/adminSettings

        //public IEnumerable<DEPARTMENT> Get()
        //{
        //    //return db.departments.AsEnumerable();
        //}

        // GET: api/adminSettings/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/adminSettings
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/adminSettings/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/adminSettings/5
        public void Delete(int id)
        {
        }
    }
}
