using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Models
{
    public class UserData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Nbf { get; set; }
        public string Exp { get; set; }
        public string Password {get; set; }

        public string ToToken()
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
                new Claim(ClaimTypes.Name, Name),
                new Claim(ClaimTypes.Email, Email),
                new Claim(ClaimTypes.Role, Role),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };

            var token = new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["SuperSecretKey"])),
                                             SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static UserData FromToken(string token)
        {
            var jwttoken = new JwtSecurityToken(token);
            int id = Int32.Parse(jwttoken.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value);
            string name = jwttoken.Claims.Where(c => c.Type == ClaimTypes.Name).FirstOrDefault()?.Value;
            string email = jwttoken.Claims.Where(c => c.Type == ClaimTypes.Email).FirstOrDefault()?.Value;
            string role = jwttoken.Claims.Where(c => c.Type == ClaimTypes.Role).FirstOrDefault()?.Value;
            string nbf = jwttoken.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Nbf).FirstOrDefault()?.Value;
            string exp = jwttoken.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Exp).FirstOrDefault()?.Value;
            return new UserData {Name=name, Id=id, Email=email, Role=role, Nbf=nbf, Exp=exp, Password=null};
        }

    }
}