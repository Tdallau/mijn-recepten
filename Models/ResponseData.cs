using System.Collections.Generic;
using System.Security.Claims;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Models {
    public class ResponseData {
        public string Token {get; set;}
        public UserData User {get; set;}
        public ResponseData(string token, UserData user) {
            this.Token = token;
            this.User = user;
        }
    }
}