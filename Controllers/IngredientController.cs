using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mijn_recepten.Contexts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using mijn_recepten.Models.DB;

namespace mijn_recepten.controller
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly MainContext __context;
        public IngredientController(MainContext context)
        {
            this.__context = context;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] Ingredient ingredient)
        {
            if (ingredient != null && (ingredient.ingredient != null && ingredient.ingredient != ""))
            {

                this.__context.Add(ingredient);
                this.__context.SaveChanges();
                return Ok(ingredient);
            }
            return UnprocessableEntity("error");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Recipe UpdatedRecipe)
        {
            if (UpdatedRecipe != null && (UpdatedRecipe.name != null && UpdatedRecipe.name != "") &&
                                 (UpdatedRecipe.requester != null && UpdatedRecipe.requester != ""))
            {

                var recipe = (from recipes in this.__context.recipes
                              where recipes.id == id
                              select recipes).FirstOrDefault();

                recipe.name = UpdatedRecipe.name;
                recipe.persons = UpdatedRecipe.persons;
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
