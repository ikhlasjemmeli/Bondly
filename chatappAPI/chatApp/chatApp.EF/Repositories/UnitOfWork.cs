using chatApp.CORE.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.EF.Repositories
{
    public class UnitOfWork :IUnitOfWork
    {
        public readonly ApplicationContext _context;
        public IUserRepository Users { get; set; }
        public IProfileRepository Profiles { get; set; }

        public IPostRepository Posts { get; set; }
        public IReactionRepository Reactions { get; set; }
        public UnitOfWork(ApplicationContext context)
        {

            _context = context;
            Posts = new PostRepository(_context);
            Users = new UserRepository(_context);
            Profiles = new ProfileRepository(_context);
            Reactions = new ReactionRepository(_context);

        }
        public void Dispose()
        {
            _context.Dispose();
        }
        public int complete()
        {
            return  _context.SaveChanges();
        }
    }
}
