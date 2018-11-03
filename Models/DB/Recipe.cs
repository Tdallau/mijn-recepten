using System.Collections.Generic;

namespace mijn_recepten.Models.DB {
    public class Recipe {
        public int id {get; set;}
        public string name {get; set;}
        public string requester {get; set;}
        public string videoId {get; set;}
        public string persons {get; set;}
        public List<Link> links {get; set;}
        public List<Ingredient> ingredients {get; set;}
    }
}