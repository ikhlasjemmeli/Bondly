using chatApp.CORE.Dtos;
using chatApp.CORE.Models;

namespace chatApp.CORE.interfaces
{
    public interface IPostRepository : IBaseRepository<Post>
    {

        Task<string> AddPost(string UserId,PostDto post);
        IEnumerable<Post> GetAllPostsById(string UserId);
    }
}
