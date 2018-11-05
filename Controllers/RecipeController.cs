using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mijn_recepten.Contexts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using mijn_recepten.Models.DB;
using Microsoft.AspNetCore.Authorization;
using mijn_recepten.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace mijn_recepten.Controllers
{
    [EnableCors("MyPolicy")]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly MainContext __context;
        public RecipeController(MainContext context)
        {
            this.__context = context;
        }
        // GET api/recipe
        [HttpGet]
        public ActionResult<IEnumerable<ResponseRecipe>> Get()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            var userToken = token.Split(' ')[1];
            var jwttoken = new JwtSecurityToken(userToken);
            var userId = Int32.Parse(jwttoken.Claims.Where(x=> x.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value);
            var query = from recipes in this.__context.Recipes
                        join favorites in this.__context.Favorites on recipes.Id equals favorites.RecipeId into rf
                        join favorite in this.__context.Favorites on userId equals favorite.UserId into fu
                        select new ResponseRecipe{Id = recipes.Id, Name=recipes.Name, Requester=recipes.Requester, VideoId=recipes.VideoId, Persons=recipes.Persons, Links=recipes.Links, Ingredients=recipes.Ingredients, 
                                            Favorite=rf.FirstOrDefault() != null && fu.FirstOrDefault() != null ? true : false};
                        // recipes.id, recipes.name, recipes.requester, recipes.persons, recipes.ingredients, recipes.links, recipes.videoId, 
            return Ok(query.ToList());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var query = from recipes in this.__context.Recipes
                        where recipes.Id == id
                        select new {recipes.Id, recipes.Name, recipes.Requester, recipes.Persons, recipes.Ingredients, recipes.Links, recipes.VideoId};
            return Ok(query.FirstOrDefault());
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] Recipe recipe)
        {
            if (recipe != null && (recipe.Name != null && recipe.Name != "") &&
                                 (recipe.Requester != null && recipe.Requester != ""))
            {

                this.__context.Add(recipe);
                this.__context.SaveChanges();
                return Ok(recipe);
            }
            return UnprocessableEntity("error");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Recipe UpdatedRecipe)
        {
            if (UpdatedRecipe != null && (UpdatedRecipe.Name != null && UpdatedRecipe.Name != "") &&
               (UpdatedRecipe.Requester != null && UpdatedRecipe.Requester != "") &&
               (UpdatedRecipe.VideoId != null && UpdatedRecipe.VideoId != "") &&
               (UpdatedRecipe.Persons != null && UpdatedRecipe.Persons != ""))
            {

                var recipe = (from recipes in this.__context.Recipes
                              where recipes.Id == id
                              select recipes).FirstOrDefault();

                recipe.Name = UpdatedRecipe.Name;
                recipe.Persons = UpdatedRecipe.Persons;
                recipe.VideoId = UpdatedRecipe.VideoId;
                recipe.Requester = UpdatedRecipe.Requester;

                this.__context.Update(recipe);
                this.__context.SaveChanges();
                return Ok();
            }
            return UnprocessableEntity();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var recipe = this.__context.Recipes.FirstOrDefault(x => x.Id == id);
            if (recipe != null)
            {
                this.__context.Recipes.Remove(recipe);
                this.__context.SaveChanges();

                return Ok();
            }
            return UnprocessableEntity();

        }
    }
}
