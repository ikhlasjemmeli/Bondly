using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace chatApp.EF.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext _context) : base(_context)
        {

        }
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.Include(p=>p.Profile).Include(p=>p.Friends).Include(p=>p.ReceivedRequests).Include(p=>p.SentRequests).ToList();
        }
        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }
        public User AddUser(UserDto User)
        {
            if (User != null)
            {
                var userToAdd = new User { FirstName = User.FirstName, LastName = User.LastName, DateOfBirth = User.DateOfBirth, Email = User.Email, Password = User.Password };
                _context.Users.Add(userToAdd);

                return userToAdd;
            }
            return null;
        }

        public User getUserInformationFormJwtToken(string token )
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("mfslkdfjsdfmsldkfjsdfjsdf123456888797867698697");
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var firstName = jwtToken.Claims.FirstOrDefault(x => x.Type == "FirstName")?.Value;
            var lastName = jwtToken.Claims.FirstOrDefault(x => x.Type == "LastName")?.Value;
            var email = jwtToken.Claims.FirstOrDefault(x => x.Type == "Email")?.Value;

            
            return new User
            {

                Id = Guid.Parse(userId),
                FirstName = firstName,
                LastName = lastName,
                Email = email
            };
        }

        private string GenerateToken(string Email)
        {
            var user = GetUserByEmail(Email);
            if (user != null)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim("Email",Email),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("FirstName",user.FirstName),
                    new Claim("LastName",user.LastName)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mfslkdfjsdfmsldkfjsdfjsdf123456888797867698697"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                var token = new JwtSecurityToken
                    (
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                    );
                var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
            return null;
        }

        public async Task<string> Authenticate(LoginDto user)
        {
            if (user != null)
            {
                User account = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);
                if (account != null)
                {
                    return GenerateToken(user.Email);
                }
                else
                {
                    return "Error: Incorrect email or password. Please try again.";
                }
            }
            else
            {
                return "Error: No data provided. Please check your input.";
            }
        }

       public void  DeleteUser(string userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == Guid.Parse(userId));
            //var profile = _context.Profiles.FirstOrDefault(p => p.UserId == Guid.Parse(userId));
            _context.Users.Remove(user);
            //_context.Profiles.Remove(profile);
        }


        public async Task<string> updatePassword(string userId, PasswordDto passwordDto){
            if (userId != null)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u=>u.Id == Guid.Parse(userId));
                if (user != null)
                {
                    if(user.Password != passwordDto.Password)
                    {
                        return "The password you entered is incorrect. Please try again.";
                    }
                    else
                    {
                        if(passwordDto.NewPassword != passwordDto.ConfirmPassword)
                        {
                            return "The new password and confirmation password do not match. Please try again.";
                        }
                        else
                        {
                            user.Password = passwordDto.NewPassword;
                            _context.Users.Update(user);
                            return "Your password has been successfully updated.";
                        }
                    }
                }
                else
                {
                    return "user is null";
                }
            }
            else
            {
                return "userId is null";
            }
        } 

        public IEnumerable<User> GetAllContacts(string userId)
        {
            var user = _context.Users.Include(u=>u.Friends).Include(u=>u.BlockedUsers).FirstOrDefault(u=>u.Id ==Guid.Parse(userId));
            var Friends = user.Friends;
            var Blocked = user.BlockedUsers;
            var users = _context.Users.Include(p => p.Profile).Include(p => p.Friends).Include(p => p.ReceivedRequests).Include(p => p.SentRequests).ToArray();
            return users.Except(Friends).Except(Blocked).Where(u=>u.Id !=user.Id).ToArray();
        }
    }
}
