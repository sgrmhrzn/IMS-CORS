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

        [Required]
        public string NAME { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public int AccessRole { get; set; }

        [Required]
        public string UserPassword { get; set; }

        [Required]
        public int Status { get; set; }

        [Required]
        public string MasterID { get; set; }
    }
}