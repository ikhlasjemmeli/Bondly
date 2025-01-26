using chatApp.CORE.Dtos;
using chatApp.CORE.Models;

namespace chatApp.CORE.interfaces
{
    public interface IProfileRepository : IBaseRepository<Profile>
    {
        Task<object> getProfileById(Guid UserId);
        Task<string> CompleteProfile(string UserId, ProfileDto profile);
        Task<string> updateProfilePicture(string path, string userId);
    }
}
