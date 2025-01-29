namespace chatApp.CORE.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string description { get; set; }
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }
    }
}
