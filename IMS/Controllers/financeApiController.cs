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
    public class financeApiController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        // GET: api/Test
        [Route("api/financeApi/getFeeStructures")]
        public IEnumerable<FeeStructure> Get()
        {
            //return new string[] { "value1", "value2" };
            return db.feeStructures.AsEnumerable();
        }

        [Route("api/financeApi/getFeeStr/{id}")]
        // GET: api/Test/5
        public FeeStructure Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.feeStructures.Where(x => x.ID == no).FirstOrDefault();
            return byId;
        }

        [Route("api/financeApi/addFeeStructures")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public HttpResponseMessage Post(FeeStructure fee)
        {
            db.feeStructures.Add(fee);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Added!");
        }

        [Route("api/financeApi/updateFeeStructures/{id}")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost, HttpGet]
        public string Put(FeeStructure fee)
        {
            if (fee != null)
            {
                int no = Convert.ToInt32(fee.ID);
                var getRecord = db.feeStructures.Where(x => x.ID == no).FirstOrDefault();
                getRecord.Class = fee.Class;
                getRecord.Category = fee.Category;
                getRecord.AdmissionFee = fee.AdmissionFee;
                getRecord.MonthlyFee = fee.MonthlyFee;
                getRecord.ExtraCurricularActivity = fee.ExtraCurricularActivity;
                getRecord.ExamFee = fee.ExamFee;
                getRecord.LateFeeCharge = fee.LateFeeCharge;

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
            var record = db.employee.Include("contact_detail").Where(x => x.EmpID == no).FirstOrDefault();
            db.employee.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
    }
}
