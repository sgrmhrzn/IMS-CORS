using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class personDes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int person_id { get; set; }

        public string name { get; set; }

        public string profession { get; set; }

        [ForeignKey("person_id")]
        public contact_detail contact_detail { get; set; }


    }
}