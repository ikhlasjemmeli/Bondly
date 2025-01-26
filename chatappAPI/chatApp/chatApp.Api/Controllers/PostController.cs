using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
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
            var postDto = Posts.Select( post => new {
                id =post.Id,
                description = post.description,
                postPath= post.postPath,
                privacy = post.privacy,
                publicationDate = post.publicationDate,
                UserFirstName= _unitOfWork.Users.GetById(post.UserId).FirstName,
                UserLastName = _unitOfWork.Users.GetById(post.UserId).LastName,
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
    }
}
