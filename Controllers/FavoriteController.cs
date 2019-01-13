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
    [EnableCors("SiteCorsPolicy")]
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
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            var userToken = token.Split(' ')[1];
            var jwttoken = new JwtSecurityToken(userToken);
            var userId = Int32.Parse(jwttoken.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value);


            if (newFavorite != null && (newFavorite.RecipeId > 0))
            {
                var favorite = this.checkIfFavoriteExist(userId, newFavorite.RecipeId);
                if (favorite == null)
                {
                    var newF = new Favorite { UserId = userId, RecipeId = newFavorite.RecipeId };
                    this.__context.Favorites.Add(newF);
                    this.__context.SaveChanges();
                    return Ok(newFavorite);
                }
                else
                {
                    this.__context.Favorites.Remove(favorite);
                    this.__context.SaveChanges();
                    return Ok();
                }

            }
            return UnprocessableEntity("error");
        }
        private Favorite checkIfFavoriteExist(int userId, int recipeId)
        {
            var query = from favorite in this.__context.Favorites
                        where favorite.UserId == userId && favorite.RecipeId == recipeId
                        select favorite;
            return query.FirstOrDefault();
        }

    }
}
