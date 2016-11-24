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

        public int ClassRoom_ID { get; set; }

        public string DayOfTheWeek { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public int Lecture_ID { get; set; }

    }
}