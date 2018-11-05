namespace mijn_recepten.Models.DB {
    public class Ingredient {
        public int Id {get; set;}
        public int RecipeId {get; set;}
        public string Name {get; set;}
    }
}