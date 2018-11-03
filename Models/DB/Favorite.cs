using System.Collections.Generic;

namespace mijn_recepten.Models.DB {
    public class Favorite {
        public int id {get; set;}
        public int userId {get; set;}
        public int recipeId {get; set;}

    }
}