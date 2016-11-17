using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using IMS.Core;

namespace IMS.Data
{

    public class AbDataContext : DbContext
    {


        public AbDataContext() : base("AbDataContext")
        {
            //Configuration.ProxyCreationEnabled = false;
            //Configuration.LazyLoadingEnabled = false;
        }
        //public DbSet<personDes> personDetails { get; set; }
        //public DbSet<contact_detail> contactDetails { get; set; }

        public DbSet<EMPLOYEE> employee { get; set; }

        public DbSet<DEPARTMENT> departments { get; set; }

        public DbSet<Users> userAccounts { get; set; }

        public DbSet<Student> students { get; set; }

        public DbSet<STUDENT_DETAILS> studentDetails { get; set; }

        public DbSet<FeeStructure> feeStructures { get; set; }

        public DbSet<StdAttendance> stdAttendance { get; set;}

        public DbSet<BatchCreation> batches { get; set; }

        public DbSet<Courses> courses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            //modelBuilder.Entity<contact_detail>()
            //.HasKey(e => e.person_id);

            //modelBuilder.Entity<personDes>()
            //.HasRequired(s => s.contact_detail)
            //.WithRequiredPrincipal(ad => ad.personDetails);

            modelBuilder.Entity<STUDENT_DETAILS>()
            .HasKey(e => e.StdID);

            modelBuilder.Entity<Student>()
            .HasRequired(s => s.studentDetails)
            .WithRequiredPrincipal(ad => ad.students);

        }
    }
}