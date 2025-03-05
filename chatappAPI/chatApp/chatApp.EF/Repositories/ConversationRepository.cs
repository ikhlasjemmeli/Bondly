using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.EF.Repositories
{
    public class ConversationRepository:BaseRepository<Conversation>,IConversationRepository
    {
        private readonly ApplicationContext _context;
        public ConversationRepository(ApplicationContext context): base(context)
        {
            _context = context;
        }

        public IEnumerable<Conversation> GetAllConversation()
        {
            return _context.Conversations.Include(c=>c.Messages).ToList();
        }

        public IEnumerable<Conversation> GetAllConversationByUserId(string UserId)
        {
            return _context.Conversations.Include(c => c.Messages).Where(c=>c.User1Id ==Guid.Parse(UserId) || c.User2Id == Guid.Parse(UserId)).ToList() ?? new List<Conversation>();
        }

        public Conversation GetConversationBetWeenTwoUsers(string user1Id,string user2Id)
        {
            return _context.Conversations.Include(c => c.Messages).Include(c=>c.User2).ThenInclude(u=>u.Profile)
                .FirstOrDefault(c =>
            (c.User1Id ==Guid.Parse(user1Id) && c.User2Id == Guid.Parse(user2Id)) ||
            (c.User1Id == Guid.Parse(user2Id) && c.User2Id == Guid.Parse(user1Id)))
           
            ?? new Conversation();
        }
        public async Task<Message> SendMessage(MessageDto request)
        {
           
            var conversation = await _context.Conversations
                .FirstOrDefaultAsync(c =>
                    (c.User1Id == request.SenderId && c.User2Id == request.ReceiverId) ||
                    (c.User1Id == request.ReceiverId && c.User2Id == request.SenderId));

           
            if (conversation == null)
            {
                conversation = new Conversation
                {
                    Id = Guid.NewGuid(),
                    User1Id = request.SenderId,
                    User2Id = request.ReceiverId,
                    Messages = new List<Message>()
                };

                await _context.Conversations.AddAsync(conversation);
            }

           
            var message = new Message
            {
                Id = Guid.NewGuid(),
                SenderId = request.SenderId,
                ReceiverId = request.ReceiverId,
                ConversationId = conversation.Id,
                Content = request.Content,
                IsEmoji = request.IsEmoji,
                Timestamp = DateTime.Now
            };

            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync(); 

            return message;
        }

        public void changeColorConversation(string conversationId, string color) 
        {
            var conversation = _context.Conversations.FirstOrDefault(c => c.Id == Guid.Parse(conversationId));
            conversation.Color = color;
            _context.Conversations.Update(conversation);

        }

        public void changeEmoji(string conversationId, string emoji)
        {
            var conversation = _context.Conversations.FirstOrDefault(c => c.Id == Guid.Parse(conversationId));
            conversation.Emoji = emoji;
            _context.Conversations.Update(conversation);

        }

        public void MarkAsViewed(string conversationId, string userId)
        {
            var conversation = _context.Conversations.Include(c=>c.Messages).FirstOrDefault(c => c.Id == Guid.Parse(conversationId));
            var messages = conversation?.Messages.Where(u=>u.SenderId ==Guid.Parse(userId)).ToList();
            foreach(var msg in messages)
            {

                if (msg.View == false)
                   msg.View = true;
                
            }
            _context.Conversations.Update(conversation);

        }


        

    }
}
