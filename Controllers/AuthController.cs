using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mijn_recepten.Contexts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using mijn_recepten.Services;
using mijn_recepten.Models;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("auth/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MainContext __context;
        private AuthServices authServices;
        private PasswordServices passwordServices;
        public AuthController(MainContext context)
        {
            this.__context = context;
            this.authServices = new AuthServices(context);
            this.passwordServices = new PasswordServices(context);
        }

        // POST api/values
        [HttpPost("login")]
        public ActionResult<ResponseData> Login([FromBody] Login loginData)
        {
            var user = this.authServices.CheckEmailPasswordCombination(loginData.Email, loginData.Password);
            if (user != null)
            {
                var responseUser = new UserData(){Name = user.name, Id = user.id, Email=user.email, Role = user.role};
                var token = responseUser.ToToken();
                var userData = UserData.FromToken(token);
                var returnType = new ResponseData(token, userData);
                return Ok(returnType);

            }
            return Unauthorized();
        }
        [HttpPost("register")]
        public ActionResult<string> Register([FromBody] User user)
        {
            try
            {
                var salt = this.passwordServices.generateSalt();
                var passwordHash = this.passwordServices.generatateHash(user.passwordHash, salt);
                var newUser = new User() { name = user.name, email = user.email, role = user.role, passwordHash = passwordHash, passwordSalt= salt};
                this.__context.Add(newUser);
                this.__context.SaveChanges();
                return Ok(user);
            }
            catch (System.InvalidOperationException)
            {
                return Unauthorized();
            }
        }
    }

}



