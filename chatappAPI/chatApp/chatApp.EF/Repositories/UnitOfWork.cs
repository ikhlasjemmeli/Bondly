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
        public UnitOfWork(ApplicationContext context)
        {

            _context = context;
            Users = new UserRepository(_context);
            Profiles = new ProfileRepository(_context);

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
