using chatApp.CORE.Dtos;
using chatApp.CORE.Models;

namespace chatApp.CORE.interfaces
{
    public interface IConversationRepository : IBaseRepository<Conversation>
    {
        Task<Message> SendMessage(MessageDto message);
        IEnumerable<Conversation> GetAllConversation();
        IEnumerable<Conversation> GetAllConversationByUserId(string UserId);
        Conversation GetConversationBetWeenTwoUsers(string user1Id, string user2Id);
        void changeColorConversation(string conversationId, string color);
        void changeEmoji(string conversationId, string emoji);
        void MarkAsViewed(string conversationId, string userId);
        
    }
}
