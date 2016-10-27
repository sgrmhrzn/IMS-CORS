using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class Fees
    {
        [Key]
        public int RecieptNo { get; set; }

        public decimal AmountPaid { get; set; }

        public decimal AmountDue { get; set; }

        public DateTime DateOfReciept { get; set; }

        public string RecievedBy { get; set; }

        public decimal Discount { get; set; }

        public string Description { get; set; }

        public int StdID { get; set; }
    }
}