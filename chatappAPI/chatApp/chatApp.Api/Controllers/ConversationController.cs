using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.Intrinsics.X86;

namespace chatApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        public readonly IUnitOfWork _unitOfWork;
        public ConversationController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAllConversation")]
        public IActionResult GetAllConversation()
        {
            var conversation= _unitOfWork.Conversations.GetAllConversation();
            var conversationDto = conversation.Select(conversation => new Conversation
            {
                Id = conversation.Id,
                User1Id = conversation.User1Id,
                User1 = _unitOfWork.Users.GetById(conversation.User1Id),
                User2Id = conversation.User2Id,
                User2 = _unitOfWork.Users.GetById(conversation.User2Id),
                Messages = conversation.Messages,
                Emoji=conversation.Emoji,
                Color=conversation.Color

            }).ToList();

            return Ok(conversationDto);
        }

        [HttpGet("GetAllConversationByUserId")]
        public IActionResult GetAllConversationByUserId(string UserId)
        {
            Guid userGuid = Guid.Parse(UserId);
            var conversations = _unitOfWork.Conversations.GetAllConversationByUserId(UserId);

            var conversationDto = conversations.Select(conversation =>
            {
                bool isUser1 = conversation.User1Id == userGuid;
                var user1Id = isUser1 ? conversation.User1Id : conversation.User2Id;
                var user2Id = isUser1 ? conversation.User2Id : conversation.User1Id;
                var LastMessage = conversation.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault();
                return new 
                {
                    Id = conversation.Id,
                    User1Id = user1Id,
                    User1 = _unitOfWork.Users.GetById(user1Id),
                    User2Id = user2Id,
                    User2 = _unitOfWork.Users.GetById(user2Id),
                    Messages = conversation.Messages.OrderByDescending(m => m.Timestamp),
                    LastMessage= new
                    {
                       content = LastMessage.SenderId == userGuid ? "You :"+ LastMessage.Content : LastMessage.Content,
                       Date= LastMessage.Timestamp
                    },
                    MessageNotViewed = conversation.Messages.Where(m => m.View == false && m.SenderId== user2Id).Count(),
                };
            }).OrderByDescending(c => c.LastMessage?.Date).ToList();

            return Ok(conversationDto);
        }

        [HttpGet("GetConversationBetWeenTwoUsers")]
        public IActionResult GetConversationBetWeenTwoUsers(string user1id, string user2id)
        {
            var conversation = _unitOfWork.Conversations.GetConversationBetWeenTwoUsers(user1id,user2id);

            
                bool isUser1 = conversation.User1Id == Guid.Parse(user1id);
                var user1Id = isUser1 ? conversation.User1Id : conversation.User2Id;
                var user2Id = isUser1 ? conversation.User2Id : conversation.User1Id;

               var conversationDto = new
                {
                    Id = conversation.Id,
                    User1Id = user1Id,
                    User1 = _unitOfWork.Users.GetById(user1Id),
                    User2Id = user2Id,
                    User2 = _unitOfWork.Users.GetById(user2Id),
                    ProfileUser2= _unitOfWork.Users.GetById(user2Id).Profile,
                    Messages = conversation.Messages.OrderBy(m => m.Timestamp),
                    Emoji = conversation.Emoji,
                    Color = conversation.Color,
                   

               };
            
            return Ok(conversationDto);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] MessageDto request)
        {
            if (request.SenderId == request.ReceiverId)
                return BadRequest("Un utilisateur ne peut pas s'envoyer un message à lui-même.");

            var message = await _unitOfWork.Conversations.SendMessage(request);
            _unitOfWork.complete();

            if (message == null)
                return BadRequest("Impossible d'envoyer le message.");

            return Ok(new
            {
                Message = "Message envoyé avec succès",
                MessageId = message.Id,
                Timestamp = message.Timestamp
            });
        }

        [HttpPut("ChangeColor")]
        public IActionResult ChangeColor(string conversationId, string color)
        {
            _unitOfWork.Conversations.changeColorConversation(conversationId, color);
            _unitOfWork.complete();
            return Ok();
        }

        [HttpPut("ChangeEmoji")]
        public IActionResult ChangeEmoji(string conversationId, string emoji)
        {
            _unitOfWork.Conversations.changeEmoji(conversationId, emoji);
            _unitOfWork.complete();
            return Ok();
        }


        [HttpPut("MarkAsViewed")]
        public IActionResult MarkAsViewed(string conversationId, string userId)
        {
            _unitOfWork.Conversations.MarkAsViewed(conversationId,userId);
            _unitOfWork.complete();
            return Ok();
        }


    }
}
