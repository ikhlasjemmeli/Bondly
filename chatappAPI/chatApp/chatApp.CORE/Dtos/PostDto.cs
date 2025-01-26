using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.Dtos
{
    public  class PostDto
    {
        public string? description { get; set; }
        public string? postPath { get; set; }
        public string privacy { get; set; }
        
    }
}
