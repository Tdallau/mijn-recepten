using System.Collections.Generic;

namespace mijn_recepten.Models.DB {
    public class Recipe {
        public int Id {get; set;}
        public string Name {get; set;}
        public string Requester {get; set;}
        public string VideoId {get; set;}
        public string Persons {get; set;}
        public List<Link> Links {get; set;}
        public List<Ingredient> Ingredients {get; set;}
    }
}