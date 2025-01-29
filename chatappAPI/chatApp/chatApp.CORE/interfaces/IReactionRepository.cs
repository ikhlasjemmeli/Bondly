using chatApp.CORE.Dtos;
using chatApp.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.interfaces
{
    public interface IReactionRepository :IBaseRepository<Reaction>
    {
         Reaction AddReaction(ReactionDto reaction);
    }
}
