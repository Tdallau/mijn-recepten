using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using mijn_recepten.Contexts;
using mijn_recepten.Models.DB;
using mijn_recepten.Models;

namespace mijn_recepten.Services
{

    public class AuthServices
    {

        private readonly MainContext __context;
        private PasswordServices passwordServices;
        public AuthServices(MainContext context)
        {
            this.__context = context;
            this.passwordServices = new PasswordServices(this.__context);
        }

        public User CheckEmailPasswordCombination(string email, string password)
        {

            var curUser = (from user in this.__context.users
                         where user.email == email
                         select user).FirstOrDefault();
            try
            {
                if(curUser != null) {
                    var passwordHash = this.passwordServices.generatateHash(password, curUser.passwordSalt);
                    if(curUser.passwordHash == passwordHash) {
                        return curUser;
                    }
                }
            }
            catch (System.InvalidOperationException)
            {
                return null;
            }
            return null;
        }

    }

}