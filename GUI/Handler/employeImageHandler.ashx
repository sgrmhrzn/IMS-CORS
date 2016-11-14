<%@ WebHandler Language="C#" Class="employeImageHandler" %>

using System;
using System.Web;

public class employeImageHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}