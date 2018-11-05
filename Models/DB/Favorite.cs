using System.Collections.Generic;

namespace mijn_recepten.Models.DB {
    public class Favorite {
        public int Id {get; set;}
        public int UserId {get; set;}
        public int RecipeId {get; set;}

    }
}