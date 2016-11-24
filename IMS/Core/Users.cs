using IMS.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class Users
    {
        [Key]
        public int UserID { get; set; }

        public string NAME { get; set; }

        public string UserName { get; set; }

        public int AccessRole { get; set; }

        public string UserPassword { get; set; }

        public int Status { get; set; }

        public string MasterID { get; set; }
    }
}