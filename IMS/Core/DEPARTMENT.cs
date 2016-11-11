using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class DEPARTMENT
    {
        [Key]
        public int DEPTID { get; set; }

        public string DEPTNAME { get; set; }
    }
}