namespace chatApp.CORE.Models
{
    public class Conversation
    {
        public Guid Id { get; set; }

        public Guid User1Id { get; set; }
        public User User1 { get; set; }

        public Guid User2Id { get; set; }
        public User User2 { get; set; }

        public ICollection<Message> Messages { get; set; } = new List<Message>();

        public string Emoji { get; set; } = "thumb_up";
        public string Color { get; set; } = "blue";

        public Conversation()
        {
            Messages = new List<Message>();
        }
    }
}
