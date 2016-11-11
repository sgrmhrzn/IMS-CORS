using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class EmpAttendance
    {
        [Key]
        public int ID { get; set; }

        public string EmpEID { get; set; }

        public DateTime DateOfAttendance { get; set; }

        public DateTime TimeIn { get; set; }

        public DateTime TimeOut { get; set; }

        public string STATUS { get; set; }
    }
}