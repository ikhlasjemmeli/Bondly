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

           

            base.OnModelCreating(modelBuilder);
        }



        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }

}
