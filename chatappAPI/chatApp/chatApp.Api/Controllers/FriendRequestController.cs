using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chatApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendRequestController : ControllerBase
    {
        public readonly IUnitOfWork _unitOfWork;
        public FriendRequestController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("AddFriendRequest")]
        public async Task<ActionResult> AddFriendRequest(FriendRequestDto request)
        {
            
            if (request != null)
            {
                var friendRequest = await _unitOfWork.FriendRequests.AddFriendRequest(request);
                _unitOfWork.complete();
                return Ok(friendRequest);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("DeleteRequest")]
        public IActionResult DeleteFriendRequest(FriendRequestDto request)
        {
            if(request != null)
            {
                _unitOfWork.FriendRequests.DeleteFriendRequest(request);
                _unitOfWork.complete();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("ReplyToRequest")]
        public IActionResult ReplyFriendRequest(bool response, FriendRequestDto friendRequest)
        {
            if(friendRequest != null)
            {
                _unitOfWork.FriendRequests.replyToFriendRequest(response, friendRequest);
                _unitOfWork.complete();
               // _unitOfWork.FriendRequests.UnblockUser((friendRequest.SenderId).ToString(), (friendRequest.ReceiverId).ToString());
               // _unitOfWork.complete();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("getAllFriends")]
        public IActionResult Friends(string UserId)
        {
            if (UserId != null)
            {
                var friends = _unitOfWork.FriendRequests.GetFriends(UserId);
                return Ok(friends);
            }
            return BadRequest();
        }

        [HttpDelete("DeleteFriend")]
        public IActionResult DeleteFriend(string UserId, string friend)
        {
            if (UserId != null && friend !=null)
            {
                _unitOfWork.FriendRequests.DeleteFriend(UserId, friend);
                _unitOfWork.complete();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("blockUser")]
        public IActionResult BlockUser(string userId, string blockedId)
        {
            if (userId != null && blockedId != null)
            {
                _unitOfWork.FriendRequests.BlockUser(userId, blockedId);
                _unitOfWork.complete();
               // _unitOfWork.FriendRequests.DeleteFriend(userId, blockedId);
               // _unitOfWork.complete();
                return Ok();
            }
            return BadRequest();
        }


        [HttpDelete("UnblockUser")]
        public IActionResult UnblockUser(string userId, string blockedId)
        {
            if (userId != null && blockedId != null)
            {
                _unitOfWork.FriendRequests.UnblockUser(userId, blockedId);
                _unitOfWork.complete();
                return Ok();
            }
            return BadRequest();
        }


        [HttpGet("GetAllBlocked")]
        public IActionResult GetAllBlocked(string userId)
        {
            if (userId != null)
            {
                var blockedusers = _unitOfWork.FriendRequests.GetBlockedUsers(userId);
                var blockedusersDto = blockedusers.Select(block => new
                {
                    firstName= block.FirstName,
                    lastName= block.LastName,
                    //bio =block?.Profile.Bio,
                    date =block.DateOfBirth,
                    //situation=block?.Profile?.Situation,
                });
                return Ok(blockedusersDto);
            }
            return BadRequest();
        }
    }
}
