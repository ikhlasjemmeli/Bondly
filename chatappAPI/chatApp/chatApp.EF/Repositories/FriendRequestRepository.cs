
using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.EntityFrameworkCore;

namespace chatApp.EF.Repositories
{
    public class FriendRequestRepository : BaseRepository<FriendRequest>, IFriendRequestRepository
    {
        private readonly ApplicationContext _context;

        public FriendRequestRepository(ApplicationContext context) : base(context)
        {
            _context = context;
        }
        public async Task<FriendRequest> AddFriendRequest(FriendRequestDto friendRequest)
        {
            var sender = _context.Users
                .Include(u => u.Friends)
                .Include(u => u.BlockedUsers)
                .FirstOrDefault(x => x.Id == friendRequest.SenderId);

            var receiver = _context.Users
                .Include(u => u.Friends)
                .Include(u => u.BlockedUsers)
                .FirstOrDefault(x => x.Id == friendRequest.ReceiverId);

            if (sender == null || receiver == null)
                throw new Exception("Utilisateur non trouvé");

            // Vérifier si l'un des deux est bloqué
            if (sender.BlockedUsers.Contains(receiver) || receiver.BlockedUsers.Contains(sender))
                throw new Exception("Impossible d'envoyer une demande à un utilisateur bloqué");

            var request = new FriendRequest
            {
                SenderId = friendRequest.SenderId,
                ReceiverId = friendRequest.ReceiverId,
                SentAt = DateTime.Now,
                IsAccepted = "Pending"
            };

            _context.FriendRequests.Add(request);

            sender.SentRequests ??= new List<FriendRequest>();
            receiver.ReceivedRequests ??= new List<FriendRequest>();
            sender.SentRequests.Add(request);
            receiver.ReceivedRequests.Add(request);

            await _context.SaveChangesAsync();

            // Rafraîchir les relations après ajout
            _context.Entry(sender).Collection(u => u.Friends).Load();
            _context.Entry(receiver).Collection(u => u.Friends).Load();

            return request;
        }


        public void DeleteFriendRequest(FriendRequestDto friendRequest) 
        { 
            var requestToDelete = _context.FriendRequests.FirstOrDefault(x => x.SenderId == friendRequest.SenderId && x.ReceiverId == friendRequest.ReceiverId);
            _context.FriendRequests.Remove(requestToDelete);
        }



        public void replyToFriendRequest(bool response, FriendRequestDto friendRequest)
        {
            var requestToDelete = _context.FriendRequests
                .FirstOrDefault(x => x.SenderId == friendRequest.SenderId && x.ReceiverId == friendRequest.ReceiverId);

            var Sender = _context.Users
                .Include(u => u.Friends)
                .Include(u => u.BlockedUsers)  
                .FirstOrDefault(x => x.Id == friendRequest.SenderId);

            var Receiver = _context.Users
                .Include(u => u.Friends)
                .Include(u => u.BlockedUsers)  
                .FirstOrDefault(x => x.Id == friendRequest.ReceiverId);

            if (requestToDelete == null || Sender == null || Receiver == null) return;

            if (response)
            {
                
                if (!Sender.BlockedUsers.Contains(Receiver) && !Receiver.BlockedUsers.Contains(Sender))
                {
                    Sender.Friends.Add(Receiver);
                    Receiver.Friends.Add(Sender);
                    _context.SaveChanges();
                }
                _context.FriendRequests.Remove(requestToDelete);
                _context.SaveChanges();
            }
            else
            {
                _context.FriendRequests.Remove(requestToDelete);
            }
        }


        public IEnumerable<User> GetFriends(string UserId)
        {
            var user = _context.Users
       .Include(u => u.Friends) 
       .FirstOrDefault(u => u.Id == Guid.Parse(UserId));

            return user?.Friends ?? new List<User>();
          
        }

        public void DeleteFriend(string UserId, string friend)
        {
            var user1 = _context.Users.Include(u => u.Friends).FirstOrDefault(u => u.Id == Guid.Parse(UserId));
            var user2 = _context.Users.Include(u => u.Friends).FirstOrDefault(u => u.Id == Guid.Parse(friend));
            var friendToRemove1 = user1.Friends.FirstOrDefault(f => f.Id == Guid.Parse(friend));
            var friendToRemove2 = user2.Friends.FirstOrDefault(f => f.Id == Guid.Parse(UserId));
            user1.Friends.Remove(friendToRemove1);
            user2.Friends.Remove(friendToRemove2);
        }

        public void BlockUser(string userId, string blockId)
        {
            var user = _context.Users
                .Include(u => u.Friends)
                .Include(u => u.BlockedUsers)
                .Include(u => u.SentRequests)   
                .Include(u => u.ReceivedRequests)
                .FirstOrDefault(u => u.Id == Guid.Parse(userId));

            var userToBlock = _context.Users
                .Include(u => u.Friends)
                .Include(u => u.BlockedUsers)
                .Include(u => u.SentRequests)
                .Include(u => u.ReceivedRequests)
                .FirstOrDefault(u => u.Id == Guid.Parse(blockId));

            var requestToDelete1 = _context.FriendRequests?.FirstOrDefault(x => x.SenderId == Guid.Parse(userId) && x.ReceiverId == Guid.Parse(blockId));
            
            var requestToDelete2 = _context.FriendRequests?.FirstOrDefault(x => x.SenderId == Guid.Parse(blockId) && x.ReceiverId == Guid.Parse(userId));

            if (user != null && userToBlock != null)
            {
                // Vérifie si l'utilisateur est déjà bloqué
                if (!user.BlockedUsers.Contains(userToBlock))
                {
                    
                    user.BlockedUsers.Add(userToBlock);
                    if (requestToDelete1 != null) { _context.FriendRequests?.Remove(requestToDelete1); }
                    if (requestToDelete2 != null) { _context.FriendRequests?.Remove(requestToDelete2); }
                    /* var sentRequest = user.SentRequests?.FirstOrDefault(r => r.ReceiverId == Guid.Parse(blockId));
                     if (sentRequest != null)
                     {
                         user.SentRequests?.Remove(sentRequest);
                         user.ReceivedRequests.Remove(user.ReceivedRequests?.FirstOrDefault(r => r.SenderId == Guid.Parse(blockId)));

                     }


                     var sentRequestToBlock = userToBlock.SentRequests?.FirstOrDefault(r => r.ReceiverId == Guid.Parse(userId));
                     if (sentRequestToBlock != null)
                     { 
                         userToBlock.SentRequests.Remove(sentRequestToBlock);
                         userToBlock.ReceivedRequests.Remove(userToBlock.ReceivedRequests?.FirstOrDefault(r => r.SenderId == Guid.Parse(userId)));
                     }*/


                }



                _context.SaveChanges();

                // Forcer la mise à jour des relations en rechargement
                _context.Entry(user).Collection(u => u.Friends).Load();
                _context.Entry(user).Collection(u => u.BlockedUsers).Load();
            }
        

    }




    public void UnblockUser(string userId, string blockedId)
        {
            var user1 = _context.Users.Include(u => u.BlockedUsers).FirstOrDefault(u => u.Id == Guid.Parse(userId));
            var user2 = _context.Users.Include(u => u.BlockedUsers).FirstOrDefault(u => u.Id == Guid.Parse(blockedId));
            var blockedToRemove1 = user1.BlockedUsers.FirstOrDefault(f => f.Id == Guid.Parse(blockedId));
            var blockedToRemove2 = user2.BlockedUsers.FirstOrDefault(f => f.Id == Guid.Parse(userId));
            user1.BlockedUsers.Remove(blockedToRemove1);
            user2.BlockedUsers.Remove(blockedToRemove2);
        }

        public IEnumerable<User> GetBlockedUsers(string userId)
        {
            var users = _context.Users.Include(u => u.Profile)
       .Include(u => u.BlockedUsers)
       .FirstOrDefault(u => u.Id == Guid.Parse(userId));

            return users?.BlockedUsers;

        }
    }
}



