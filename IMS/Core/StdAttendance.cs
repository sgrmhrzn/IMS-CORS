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

        public int StdID { get; set; }

        public DateTime DateOfAttendance { get; set; }

        public TimeSpan TIME { get; set; }

        public string STATUS { get; set; }

        //public Student students { get; set; }

        //public ICollection<STUDENT_DETAILS> studentDetails { get; set; }
    }
}