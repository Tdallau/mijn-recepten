using System.Collections.Generic;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Models {
    public class ResponseRecipe : Recipe {
        public bool Favorite {get; set;}
    }
}