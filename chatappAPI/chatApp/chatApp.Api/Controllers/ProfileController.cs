using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chatApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProfileController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }
        [HttpGet("GetAllProfiles")]
        public async Task<ActionResult> GetAllProfiles()
        {
            
            return Ok(_unitOfWork.Profiles.GetAll());
        }

        [HttpGet("GetProfileById")]
        public async Task<ActionResult> GetProfileById( string UserId)
        {
            return Ok( await _unitOfWork.Profiles.getProfileById(Guid.Parse(UserId)));
        }


        [HttpPost("CompleteProfile")]
        public async Task<ActionResult> CompleteProfile(string userId, [FromBody] ProfileDto profile)
        {
            var profileCompleted= await _unitOfWork.Profiles.CompleteProfile(userId,profile);
            _unitOfWork.complete();
            return Ok(profileCompleted);
        }

        [HttpPut("UpdateProfilePicture")]
        public async Task<ActionResult> UpdateProfilePicture(string userId, string path)
        {
            var pictureaded = await _unitOfWork.Profiles.updateProfilePicture(path,userId);
            _unitOfWork.complete();
            return Ok();
        }

    }
}
