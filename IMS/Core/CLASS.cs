using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class CLASS
    {
        [Key]
        public int CLASSNO { get; set; }

        public string CLASSTEACHER { get; set; }
    }
}