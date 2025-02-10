using chatApp.CORE.Dtos;
using chatApp.CORE.Models;

namespace chatApp.CORE.interfaces
{
    public interface IFriendRequestRepository : IBaseRepository<FriendRequest>
    {
        Task<FriendRequest> AddFriendRequest(FriendRequestDto friendRequest);
        void DeleteFriendRequest(FriendRequestDto friendRequest);
        void replyToFriendRequest(bool response, FriendRequestDto friendRequest);
        IEnumerable<User> GetFriends(string UserId);
        void DeleteFriend(string UserId, string friend);

        void BlockUser(string userId, string blockId);
        void UnblockUser(string userId, string blockedId);
        IEnumerable<User> GetBlockedUsers(string userId);
    }

}
