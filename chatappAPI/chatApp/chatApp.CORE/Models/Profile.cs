using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.Models
{
    public class Profile
    {
        public Guid Id { get; set; }
        public string? ProfilePicture { get; set; }
        public string? CovoerPicture { get; set; }
        public string? Bio {  get; set; }
        public string? WorkPlace { get; set; }
        public string? Study { get; set; }
        public string? Situation { get; set; }
        public Guid UserId { get; set; }
    }
}
