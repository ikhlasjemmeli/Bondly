using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;

namespace chatApp.EF.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        private readonly ApplicationContext _context;
        public PostRepository(ApplicationContext context): base(context) 
        {

            _context = context;

        }
       public async Task<string> AddPost(string UserId,PostDto post)
        {
            if(UserId == null)
            {
                return "UserId is null";
            }
            else if(post == null)
            {
                return "PostDto is null";
            }
            else { 
            var PostToAdd = new Post
            {
                description = post.description ?? "",
                postPath = post.postPath ?? "",
                privacy = post.privacy ?? "",
                publicationDate = DateTime.Now,
                UserId = Guid.Parse(UserId)

            };
            _context.Posts.Add(PostToAdd);
            return "Post aded successffuly ";
            }
        }

        public IEnumerable<Post> GetAllPostsById(string UserId)
        {
            if (UserId != null)
            {
                var posts = _context.Posts.Where(p => p.UserId == Guid.Parse(UserId)).ToList();
                return posts;
            }
            return null;
        }
    }
}
