using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class Lecture
    {
        [Key]
        public int Lecture_ID { get; set; }

        public int CourseID { get; set; }

        public int TeacherID { get; set; }

        public virtual Courses course { get; set; }
    }
}