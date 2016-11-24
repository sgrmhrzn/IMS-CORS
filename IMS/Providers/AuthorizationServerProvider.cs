using IMS.Data;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            AbDataContext db = new AbDataContext();
            //var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            //if (allowedOrigin == null) allowedOrigin = "*";

            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin",
                new[] { "http://localhost:50922" });

            // Validate your user and base on validation return claim identity or invalid_grant error
            string user = context.UserName;
            string password = context.Password;

            var checkUser = db.userAccounts.Where(x => x.UserName == user && x.UserPassword == password).Count();

            if (checkUser <= 1)
            {

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                identity.AddClaim(new Claim("sub", context.UserName));

                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { 
                        "userName", context.UserName
                    },
                    { "MasterID", string.Join(",", db.userAccounts.Where(x => x.UserName == user && x.UserPassword == password).Select(x=> x.MasterID)) }
                });

                var ticket = new AuthenticationTicket(identity, props);
                context.Validated(ticket);
            }
            else if(checkUser != 1)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

    }
}
