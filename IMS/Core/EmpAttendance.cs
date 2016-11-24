using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class EmpAttendance
    {
        [Key]
        public int ID { get; set; }

        public int EmpID { get; set; }

        public DateTime DateOfAttendance { get; set; }

        public TimeSpan TimeIn { get; set; }

        public TimeSpan TimeOut { get; set; }

        public string STATUS { get; set; }

        [ForeignKey("EmpID")]
        public virtual EMPLOYEE employee { get; set; }

        [NotMapped]
        public TimeSpan time { get; set; }
    }
}