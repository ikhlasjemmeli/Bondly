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

        // Définissez vos DbSets ici
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
    }

}
