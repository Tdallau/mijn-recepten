using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mijn_recepten.Contexts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Controllers
{
    [EnableCors("SiteCorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class LinkController : ControllerBase
    {
        private readonly MainContext __context;
        public LinkController(MainContext context)
        {
            this.__context = context;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] Link link)
        {
            if (link != null && (link.Name != null && link.Name != ""))
            {

                this.__context.Add(link);
                this.__context.SaveChanges();
                return Ok(link);
            }
            return UnprocessableEntity("error");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Recipe UpdatedRecipe)
        {
            if (UpdatedRecipe != null && (UpdatedRecipe.Name != null && UpdatedRecipe.Name != "") &&
                                 (UpdatedRecipe.Requester != null && UpdatedRecipe.Requester != ""))
            {

                var recipe = (from recipes in this.__context.Recipes
                              where recipes.Id == id
                              select recipes).FirstOrDefault();

                recipe.Name = UpdatedRecipe.Name;
                recipe.Persons = UpdatedRecipe.Persons;
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
