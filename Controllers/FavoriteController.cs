using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mijn_recepten.Contexts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using mijn_recepten.Models.DB;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using mijn_recepten.Models;

namespace mijn_recepten.controller
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly MainContext __context;
        public FavoriteController(MainContext context)
        {
            this.__context = context;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] NewFavorite newFavorite)
        {
            if (newFavorite != null && (newFavorite.recipeId > 0 && newFavorite.userId  > 0))
            {
                var newF =  new Favorite{userId=newFavorite.userId, recipeId=newFavorite.recipeId};
                this.__context.favorites.Add(newF);
                this.__context.SaveChanges();
                return Ok(newFavorite);
            }
            return UnprocessableEntity("error");
            
        }

        // PUT api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            var userToken = token.Split(' ')[1];
            var jwttoken = new JwtSecurityToken(userToken);
            var userId = Int32.Parse(jwttoken.Claims.Where(x=> x.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value);

            var favorite = this.__context.favorites.FirstOrDefault(x => x.recipeId == id && x.userId == userId);
            if (favorite != null)
            {
                this.__context.favorites.Remove(favorite);
                this.__context.SaveChanges();

                return Ok();
            }
            return UnprocessableEntity();
        }
    }
}
