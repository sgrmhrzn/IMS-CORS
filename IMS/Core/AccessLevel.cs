using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class AccessLevel
    {
        [Key]
        public int ID { get; set; }

        public string Particulars { get; set; }
    }
}