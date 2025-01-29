namespace chatApp.CORE.Models
{
    public record ReactionType(int Id, string Type)
    {
        public static readonly ReactionType Like = new(1, "like");
        public static readonly ReactionType Clap = new(2, "clap");
        public static readonly ReactionType Smile = new(3, "smile");
        public static readonly ReactionType Haha = new(4, "haha");
        public static readonly ReactionType Love = new(5, "love");

        public static IEnumerable<ReactionType> GetAll() =>
       new List<ReactionType> { Like, Love, Haha, Clap, Smile };
    }
}
