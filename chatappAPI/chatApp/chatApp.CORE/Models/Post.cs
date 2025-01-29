using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.Models
{
    public  class Post
    {
        public Guid Id { get; set; }
        public string? description { get; set; }
        public string? postPath { get; set; }
        public string privacy { get; set; }
        public DateTime publicationDate { get; set; }
        public Guid UserId { get; set; }
        public ICollection<Reaction> Reactions { get; set;}
        public ICollection<Comment> Comments { get; set;}
       
    }
}
