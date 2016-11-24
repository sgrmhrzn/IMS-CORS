using IMS.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class EMPLOYEE
    {
        [Key]
        public int EmpID { get; set; }

        [Required]
        public string NAME { get; set; }

        [Required(ErrorMessage = "Invalid No" )]
        public long? PHONE_NO { get; set; }

        [Required(ErrorMessage = "Invalid No")]
        public long? MOBILE_NO { get; set; }

        [Required]
        public string EMAIL{ get; set; }

        [Required]
        public string DESIGNATION { get; set; }

        [Required]
        public string PERMANENT_ADDRESS { get; set; }

        public string TEMP_ADDRESS { get; set; }

        [Required(ErrorMessage = "Invalid Date")]
        public DateTime DOB { get; set; }

        [Required]
        public string TEACHER_OR_NONTEACHER { get; set; }

        [Required]
        public string NATIONAL_ID_NO { get; set; }

        [Required]
        public string MARITAL_STATUS { get; set; }

        [Required]
        public string GENDER { get; set; }

        [Required]
        public string QUALIFICATION { get; set; }

        [Required]
        public int DEPTID { get; set; }

        public DateTime JoiningDate { get; set; }

        public DEPARTMENT departments { get; set; }

        public byte[] Photo { get; set; }

        [NotMapped]
        public string base64 { get; set; }
    }
}