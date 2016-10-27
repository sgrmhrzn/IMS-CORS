using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IMS.Core
{
    public class FeeStructure
    {
        [Key]
        public int ID { get; set; }

        public string Class { get; set; }

        public string Category { get; set; }

        public decimal AdmissionFee { get; set; }

        public decimal MonthlyFee { get; set; }

        public decimal ExtraCurricularActivity { get; set; }

        public decimal ExamFee { get; set; }

        public decimal LateFeeCharge { get; set; }
    }
}