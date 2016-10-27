using IMS.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class STUDENT_DETAILS
    {
        [Key]
        public int StdID { get; set; }

        [Required]
        public long? GUARDIAN_PHONE_NO { get; set; }

        [Required]
        public long? MOBILE_NO { get; set; }

        [Required]
        public string First_NAME{ get; set; }

        [Required]
        public string Last_Name { get; set; }

        [Required]
        public int Relation { get; set; }

        [Required(ErrorMessage = "Invalid Date")]
        public DateTime DOB { get; set; }

        [Required]
        public string Education { get; set; }

        public string Occupation { get; set; }
       
        [Required]
        public string Income { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string AddLine1 { get; set; }

        [Required]
        public string AddLine2 { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public int Country { get; set; }

        public virtual Student students { get; set; }
    }
}