using Microsoft.VisualBasic;
using System.Text.Json.Serialization;

namespace chatApp.CORE.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        [JsonIgnore]
        public User Sender { get; set; } 

        public Guid ReceiverId { get; set; }
        [JsonIgnore]
        public User Receiver { get; set; } 

        public Guid ConversationId { get; set; }
        [JsonIgnore]
        public Conversation Conversation { get; set; } 

        public string Content { get; set; } 
        public bool IsEmoji { get; set; } 

        public bool View {  get; set; } =false;

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
