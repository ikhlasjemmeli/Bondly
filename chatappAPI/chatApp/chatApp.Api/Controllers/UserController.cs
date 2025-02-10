using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.AspNetCore.Mvc;

namespace chatApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUnitOfWork _unitOfWork;
        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var Users = _unitOfWork.Users.GetAllUsers();
            
            return Ok(Users);
        }

        [HttpPost("Sign Up")]
        public IActionResult SignUp([FromBody] UserDto user)
        {
            if (user != null)
            {
                var existingUser = _unitOfWork.Users.GetUserByEmail(user.Email);
                if (existingUser == null)
                {
                    var userAded = _unitOfWork.Users.AddUser(user);
                    _unitOfWork.complete();

                    var profile = new Profile
                    {
                        UserId = userAded.Id
                    };
                   
                    _unitOfWork.Profiles.Add(profile);
                    _unitOfWork.complete();

                    return Ok(user);
                }
                else
                {
                    return BadRequest(new { message = "A user account already exists with this email. Please try using a different email or logging in." });
                }
            }
            return BadRequest(new { message = "Invalid user data." });
        }


        [HttpPost("Authenticate")]
        public async Task<ActionResult> Authenticate([FromBody] LoginDto user)
        {
           var token=await _unitOfWork.Users.Authenticate(user);
            var connectedUser = _unitOfWork.Users.getUserInformationFormJwtToken(token);
            return Ok(new {Token =token, ConnectedUser=connectedUser} );
        }

        [HttpDelete("DeleteAccount")]
        public ActionResult Delete(string userId)
        {
            _unitOfWork.Users.Delete(Guid.Parse(userId));
            _unitOfWork.complete();
            return Ok();
        }

        [HttpPut("UpdatePassword")]
        public async Task<ActionResult> UpdatePassword(string userId, PasswordDto passwordDto)
        {
            var passwordToUpdate = await _unitOfWork.Users.updatePassword(userId, passwordDto);
            _unitOfWork.complete();

            if (passwordToUpdate == "Your password has been successfully updated.")
            {
                return Ok(new { message = passwordToUpdate }); 
            }

            return BadRequest(new { message = passwordToUpdate }); 
        }

        [HttpDelete("deleteUser")]
        public IActionResult DeleteUser(string userId)
        {
            _unitOfWork.Users.Delete(Guid.Parse(userId));
            _unitOfWork.complete();
            return Ok();
        }


        [HttpGet("GetAllContacts")]
        public IActionResult GetAllContacts(string userId)
        {
            return Ok(_unitOfWork.Users.GetAllContacts(userId));
        }


    }
}
