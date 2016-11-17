using IMS.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class TeacherTimeTable
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int ClassRoom_ID { get; set; }

        [Required(ErrorMessage = "Invalid No" )]
        public string DayOfTheWeek { get; set; }

        [Required(ErrorMessage = "Invalid No")]
        public TimeSpan StartTime { get; set; }

        [Required(ErrorMessage = "Invalid No")]
        public TimeSpan EndTime { get; set; }

        [Required(ErrorMessage = "Invalid No")]
        public int Lecture_ID { get; set; }

    }
}