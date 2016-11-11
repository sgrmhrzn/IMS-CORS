using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class contact_detail
    {
        [Key]
        public int person_id { get; set; }
        public string phone_no { get; set; }

        public string mobile_no { get; set; }
        public string email { get; set; }

        public string address { get; set; }

        public virtual personDes personDetails { get; set; }
    }
}