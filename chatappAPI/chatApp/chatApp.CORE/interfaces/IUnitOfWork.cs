namespace chatApp.CORE.interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IProfileRepository Profiles { get; }
        IPostRepository Posts { get; }
        IReactionRepository Reactions { get; }
        IFriendRequestRepository FriendRequests { get; }
        IConversationRepository Conversations { get; }
        int complete();
    }
}
