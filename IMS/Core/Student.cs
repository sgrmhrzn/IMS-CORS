using IMS.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace IMS.Core
{
    //[Serializable]
    //[DataContract(IsReference = true)]
    public class Student
    {
        [Key]
        public int StdID { get; set; }

        [Required]
        public string NAME { get; set; }

        [Required]
        public long PHONENO{ get; set; }

        [Required(ErrorMessage = "Invalid Date")]
        public DateTime DOB { get; set; }

        [Required]
        public int CLASS { get; set; }

        [Required]
        public string GENDER { get; set; }

        [Required]
        public string ADDRESS { get; set; }

        [Required]
        public string NATIONALITY { get; set; }

        public DateTime ENROLLEDYEAR { get; set; }

        public byte[] Photo { get; set; }

        public string Category { get; set; }

        [NotMapped]
        public string base64 { get; set; }

        [ForeignKey("StdID")]
        public virtual STUDENT_DETAILS studentDetails { get; set; }

    }
}