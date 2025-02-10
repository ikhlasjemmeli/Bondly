using Microsoft.EntityFrameworkCore;
using chatApp.CORE.Models;

namespace chatApp.EF
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurer la clé primaire pour ReactionType
            modelBuilder.Entity<ReactionType>()
                .HasKey(rt => rt.Id);

            // Ajouter les données prédéfinies de ReactionType
            modelBuilder.Entity<ReactionType>().HasData(
                ReactionType.Like,
                ReactionType.Love,
                ReactionType.Haha,
                ReactionType.Clap,
                ReactionType.Smile
            );


            modelBuilder.Entity<User>()
     .HasMany(u => u.Friends)
     .WithMany()
     .UsingEntity<Dictionary<string, object>>(
         "UserFriends",
         j => j.HasOne<User>().WithMany().HasForeignKey("FriendId"),
         j => j.HasOne<User>().WithMany().HasForeignKey("UserId")
     );

            modelBuilder.Entity<User>()
                .HasMany(u => u.BlockedUsers)
                .WithMany()
                .UsingEntity<Dictionary<string, object>>(
                    "UserBlocked",
                    j => j.HasOne<User>().WithMany().HasForeignKey("BlockedUserId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId")
                );



            modelBuilder.Entity<FriendRequest>()
         .HasOne(fr => fr.Sender)
         .WithMany(u => u.SentRequests)
         .HasForeignKey(fr => fr.SenderId)
         .OnDelete(DeleteBehavior.Restrict);  // Empêche la suppression en cascade

            modelBuilder.Entity<FriendRequest>()
                .HasOne(fr => fr.Receiver)
                .WithMany(u => u.ReceivedRequests)
                .HasForeignKey(fr => fr.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }



        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
    }

}
