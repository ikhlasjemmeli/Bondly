using chatApp.CORE.Dtos;
using chatApp.CORE.Models;

namespace chatApp.CORE.interfaces
{
    public interface IPostRepository : IBaseRepository<Post>
    {

        Task<string> AddPost(string UserId,PostDto post);
        IEnumerable<Post> GetAllPostsById(string UserId);
        Task<string> AddComment(string UserId, string PostId, CommentDto comment);
        IEnumerable<Comment> GetAllCommentsById(string PostId);
        IEnumerable<Post> GetFriendsPosts(string UserId);
    }
}
