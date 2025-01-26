using System.Text.Json.Serialization;

namespace chatApp.CORE.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
       // [JsonIgnore]
        public string Password { get; set; }
        public Profile Profile { get; set; }
        public ICollection<Post> Posts { get; set; }

    }
}
