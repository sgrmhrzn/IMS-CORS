using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class StdAttendance
    {
        [Key]
        public int ID { get; set; }

        public string StdID { get; set; }

        public DateTime DateOfAttendance { get; set; }

        public DateTime TIME { get; set; }

        public string STATUS { get; set; }
    }
}