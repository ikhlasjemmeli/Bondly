using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
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
            var Users = _unitOfWork.Users.GetAll();
            return Ok(Users);
        }

        [HttpPost("Sign Up")]
        public IActionResult SignUp([FromBody] UserDto user)
        {

            if (user != null)
            {
                var existingUser = _unitOfWork.Users.GetUserByEmail(user.Email);
                if (existingUser != null)
                {

                    return BadRequest(new { message = "A user account already exists with this email. Please try using a different email or logging in." });
                }
                else
                {
                    _unitOfWork.Users.AddUser(user);
                    _unitOfWork.complete();
                    return Ok(user);
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

    }
}
