namespace chatApp.CORE.Models
{
    public class Reaction
    {
        public Guid Id { get; set; }
        public int Number { get; set; } = 0;
        public int ReactionTypeId { get; set; }
        public ReactionType ReactionType { get; set; }
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }

    }
}
