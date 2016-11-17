using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class Courses
    {
        [Key]
        public int CourseID { get; set; }

        public string CourseName { get; set; }

        public int CourseLevel { get; set; }

        public string CourseInstructor1 { get; set; }

        public string CourseInstructor2 { get; set; }

        public string CourseInstructor3 { get; set; }

        public int ClassNo { get; set; }
    }
}