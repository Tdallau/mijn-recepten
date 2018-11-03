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
            var query = from recipes in this.__context.recipes
                        join favorites in this.__context.favorites on recipes.id equals favorites.recipeId into rf
                        join favorite in this.__context.favorites on userId equals favorite.userId into fu
                        select new ResponseRecipe{id = recipes.id, name=recipes.name, requester=recipes.requester, videoId=recipes.videoId, persons=recipes.persons, links=recipes.links, ingredients=recipes.ingredients, 
                                            Favorite=rf.FirstOrDefault() != null && fu.FirstOrDefault() != null ? true : false};
                        // recipes.id, recipes.name, recipes.requester, recipes.persons, recipes.ingredients, recipes.links, recipes.videoId, 
            return Ok(query.ToList());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var query = from recipes in this.__context.recipes
                        where recipes.id == id
                        select new {recipes.id, recipes.name, recipes.requester, recipes.persons, recipes.ingredients, recipes.links, recipes.videoId};
            return Ok(query.FirstOrDefault());
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] Recipe recipe)
        {
            if (recipe != null && (recipe.name != null && recipe.name != "") &&
                                 (recipe.requester != null && recipe.requester != ""))
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
            if (UpdatedRecipe != null && (UpdatedRecipe.name != null && UpdatedRecipe.name != "") &&
               (UpdatedRecipe.requester != null && UpdatedRecipe.requester != "") &&
               (UpdatedRecipe.videoId != null && UpdatedRecipe.videoId != "") &&
               (UpdatedRecipe.persons != null && UpdatedRecipe.persons != ""))
            {

                var recipe = (from recipes in this.__context.recipes
                              where recipes.id == id
                              select recipes).FirstOrDefault();

                recipe.name = UpdatedRecipe.name;
                recipe.persons = UpdatedRecipe.persons;
                recipe.videoId = UpdatedRecipe.videoId;
                recipe.requester = UpdatedRecipe.requester;

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

            var recipe = this.__context.recipes.FirstOrDefault(x => x.id == id);
            if (recipe != null)
            {
                this.__context.recipes.Remove(recipe);
                this.__context.SaveChanges();

                return Ok();
            }
            return UnprocessableEntity();

        }
    }
}
