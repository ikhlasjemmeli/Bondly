using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.interfaces
{
    public  interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IProfileRepository Profiles { get; }
        IPostRepository Posts { get; }
        IReactionRepository Reactions { get; }
        int complete();
    }
}
