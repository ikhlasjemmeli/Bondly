using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using chatApp.EF.Migrations;
using Microsoft.EntityFrameworkCore;

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
                var posts = _context.Posts.Where(p => p.UserId == Guid.Parse(UserId)).Include(p=>p.Reactions).Include(p=>p.Comments).ToList();
                return posts;
            }
            return null;
        }

        public async Task<string> AddComment(string UserId,string PostId, CommentDto comment)
        {
            if(UserId != null && PostId !=null) 
            {
                var commentToAdd = new Comment { description =comment.description, PostId = Guid.Parse(PostId), UserId= Guid.Parse(UserId) };
                _context.Comments.Add(commentToAdd);
                return "Comment Added";
            }
            else
            {
                return "UserId is null or PostId is null";
            }
        }

        public IEnumerable<Comment> GetAllCommentsById(string PostId)
        {
            if (PostId != null)
            {
                var comments = _context.Comments.Where(p => p.PostId == Guid.Parse(PostId)).ToList();
                return comments;
            }
            return null;
        }

        public IEnumerable<Post> GetFriendsPosts(string UserId)
        {
            if (UserId == null)
            {
                return null;
            }

            var user = _context.Users
                .Include(u => u.Friends)
                .FirstOrDefault(u => u.Id == Guid.Parse(UserId));

            if (user == null)
            {
                return null;
            }

            var friendsIds = user.Friends.Select(f => f.Id).ToList();

            var posts = _context.Posts
                .Where(p => friendsIds.Contains(p.UserId) && (p.privacy == "friend" || p.privacy == "public"))
                .Include(p => p.Reactions)
                .Include(p => p.Comments)
                .OrderBy(x => Guid.NewGuid())
                .ToList();

            return posts;
        }
    }
}
