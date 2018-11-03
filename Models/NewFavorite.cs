using System.Collections.Generic;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Models {
    public class NewFavorite : Recipe {
        public int userId {get; set;}
        public int recipeId {get; set;}
    }
}