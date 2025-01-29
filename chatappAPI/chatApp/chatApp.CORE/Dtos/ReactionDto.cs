using chatApp.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.Dtos
{
    public class ReactionDto
    {
        
        public string ReactionType { get; set; }
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }
    }
}
