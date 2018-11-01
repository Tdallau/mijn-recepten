using System;
using System.Security.Cryptography;
using System.Text;
using mijn_recepten.Contexts;

namespace mijn_recepten.Services {

    public class PasswordServices {
        private readonly MainContext __context;
        public PasswordServices(MainContext context)
        {
            this.__context = context;
        }

        public string generatateHash(string password, string salt) {

             using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + salt));
                // Get the hashed string.  
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public string generateSalt() {
            byte[] bytes = new byte[128 / 8];
            using (var keyGenerator = RandomNumberGenerator.Create())
            {
                keyGenerator.GetBytes(bytes);
                return BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }
        }

    }

}