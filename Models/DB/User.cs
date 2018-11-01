using System.Collections.Generic;

namespace mijn_recepten.Models.DB {
    public class User {
        public int id {get; set;}
        public string name {get; set;}
        public string email {get; set;}
        public string passwordHash {get; set;}
        public string passwordSalt {get; set;}
        public string role {get; set;}
    }
}