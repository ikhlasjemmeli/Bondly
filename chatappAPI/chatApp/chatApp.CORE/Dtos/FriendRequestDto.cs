﻿using chatApp.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.Dtos
{
    public class FriendRequestDto
    {
        public Guid SenderId { get; set; }
        
        public Guid ReceiverId { get; set; }
        
     
       
    }
}
