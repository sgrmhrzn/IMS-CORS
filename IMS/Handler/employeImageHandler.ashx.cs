using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace IMS.Handler
{
    /// <summary>
    /// Summary description for employeImageHandler
    /// </summary>
    public class employeImageHandler : IHttpHandler
    {

        string connectionString = ConfigurationManager.ConnectionStrings["AbDataContext"].ConnectionString;
        public void ProcessRequest(HttpContext context)
        {
            int ImageId = Convert.ToInt32(context.Request.QueryString["id"]);
            String strdata = "select Photo from EMPLOYEE where ID =@ID";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(strdata, con);
                if (cmd.Connection.State.ToString() == "Closed")
                {
                    cmd.Connection.Open();
                }
                cmd.CommandText = strdata;
                cmd.Parameters.Add("@ID", SqlDbType.Int, 50).Value = ImageId;
                SqlDataReader rda = cmd.ExecuteReader();
                while (rda.Read())
                {
                    context.Response.ContentType = "application/jpg";
                    context.Response.BinaryWrite((byte[])(rda["Photo"]));
                    context.Response.Flush();
                    context.Response.End();
                }

                cmd.Connection.Close();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}