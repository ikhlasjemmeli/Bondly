using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using chatApp.EF.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chatApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public PostController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAllPosts")]
        public  IActionResult GetAllPosts()
        {
            var Posts =  _unitOfWork.Posts.GetAll();
            return Ok(Posts);
        }


        [HttpGet("GetAllPostsById")]
        public IActionResult GetAllPostsById(string UserId)
        {
            var Posts = _unitOfWork.Posts.GetAllPostsById(UserId);
            var postDto = Posts.Select(post => new {
                id = post.Id,
                description = post.description,
                postPath = post.postPath,
                privacy = post.privacy,
                publicationDate = post.publicationDate,
                userId = post.UserId,
                UserFirstName = _unitOfWork.Users.GetById(post.UserId).FirstName,
                UserLastName = _unitOfWork.Users.GetById(post.UserId).LastName,
                React = post.Reactions.Select(reaction => new
                {
                    id = reaction.Id,
                    number = reaction.Number,
                    reactionTypeId = reaction.ReactionTypeId,
                    postId = reaction.PostId,
                    userId = reaction.UserId,
                    UserFirstName = _unitOfWork.Users.GetById(reaction.UserId).FirstName ?? "",
                    UserLastName = _unitOfWork.Users.GetById(reaction.UserId).LastName ?? "",

                }).ToList(),
                Comments = post.Comments,
            }).OrderByDescending(post=>post.publicationDate);
            return Ok(postDto);
        }

        [HttpPost("AddPost")]
        public async Task<ActionResult> AddPost([FromBody] PostDto post, string UserId )
        {
            var PostAded = await  _unitOfWork.Posts.AddPost(UserId, post);
            _unitOfWork.complete();
            return Ok(PostAded);
        }

        [HttpDelete("DeletePost")]
        public  IActionResult DeletePost(string postId)
        {
            _unitOfWork.Posts.Delete(Guid.Parse(postId));
            _unitOfWork.complete();
            return Ok();
        }

        [HttpPost("AddReaction")]
        public IActionResult AddReaction(ReactionDto reaction)
        {
           var react= _unitOfWork.Reactions.AddReaction(reaction);
            _unitOfWork.complete();
            return Ok(react);
        }

        [HttpPost("AddComment")]
        public async Task<ActionResult> AddComment(string UserId, string PostId, CommentDto comment)
        {
            var commentToAdd =await _unitOfWork.Posts.AddComment(UserId,PostId,comment);
            _unitOfWork.complete();
            if(commentToAdd == "Comment Added")
            {
                return Ok(new { message = commentToAdd }); 
            }
            else
            {
                return BadRequest(new { message = commentToAdd }); 
            }
           
        }

        [HttpGet("GetAllCommentsById")]
        public IActionResult GetAllCommentsById(string PostId)
        {
            var comments = _unitOfWork.Posts.GetAllCommentsById(PostId);
            var commentsDto = comments.Select(comment => new
            {
                id = comment.Id,
                description = comment.description,
                UserFirstName = _unitOfWork.Users.GetById(comment.UserId).FirstName,
                UserLastName = _unitOfWork.Users.GetById(comment.UserId).LastName,

            }); //.OrderByDescending(post => post.publicationDate);
            return Ok(commentsDto);
        }


        [HttpGet("GetFriendsPosts")]
        public ActionResult<IEnumerable<Post>> GetFriendsPosts(string userId)
        {
            var posts = _unitOfWork.Posts.GetFriendsPosts(userId);

            if (posts == null || !posts.Any())
            {
                return NotFound("No posts found.");
            }

            return Ok(posts);
        }

    }
}
