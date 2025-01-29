using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.EF.Repositories
{
    public class ReactionRepository: BaseRepository<Reaction>,IReactionRepository
    {
       
        public ReactionRepository(ApplicationContext context) :base(context) 
        {
            
        }

        public Reaction AddReaction(ReactionDto reaction)
        {
            
            var reactionType = ReactionType.GetAll().FirstOrDefault(rt => rt.Type.Equals(reaction.ReactionType, StringComparison.OrdinalIgnoreCase));

            
            if (reactionType == null)
            {
                throw new ArgumentException("Type de réaction invalide");
            }

            
            var existingReact = _context.Reactions.FirstOrDefault(r => r.ReactionTypeId == reactionType.Id && r.PostId == reaction.PostId && reaction.UserId ==reaction.UserId);

            
            if (existingReact != null)
            {
               // existingReact.Number += 1;
                _context.Reactions.Remove(existingReact);
                return existingReact;
            }
            else
            {
                
                var newReact = new Reaction
                {
                    ReactionTypeId = reactionType.Id,
                    PostId = reaction.PostId,
                    UserId = reaction.UserId,
                    Number = 1
                };

                _context.Reactions.Add(newReact);
                return newReact;
            }
        }


    }
}
