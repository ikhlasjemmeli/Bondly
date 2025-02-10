using chatApp.CORE.Dtos;
using chatApp.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.CORE.interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        User AddUser(UserDto User);
        User GetUserByEmail(string email);
       Task<string> Authenticate(LoginDto user);
        User getUserInformationFormJwtToken(string token);
        Task<string> updatePassword(string userId, PasswordDto passwordDto);
        IEnumerable<User> GetAllUsers();
        IEnumerable<User> GetAllContacts(string userId);



    }
}
