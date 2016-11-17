using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class Std_Category
    {
        [Key]
        public int ID { get; set; }

        public string Category { get; set; }
    }
}