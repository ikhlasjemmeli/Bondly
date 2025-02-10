using System.Text.Json.Serialization;

namespace chatApp.CORE.Models
{
    public class FriendRequest
    {
        public int Id { get; set; }
        public Guid SenderId { get; set; }
        [JsonIgnore]
        public User Sender { get; set; }

        public Guid ReceiverId { get; set; }
        [JsonIgnore]
        public User Receiver { get; set; } 
        public DateTime SentAt { get; set; }
        public string IsAccepted { get; set; }
    }
}
