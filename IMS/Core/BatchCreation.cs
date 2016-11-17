using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class BatchCreation
    {
        [Key]
        public int ID { get; set; }

        public string Section { get; set; }

        public int Class { get; set; }

        public string BatchName { get; set; }

        public int MaxNoOfStds { get; set; }

    }

}