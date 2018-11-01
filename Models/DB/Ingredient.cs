namespace mijn_recepten.Models.DB {
    public class Ingredient {
        public int id {get; set;}
        public int recipeId {get; set;}
        public string ingredient {get; set;}
    }
}