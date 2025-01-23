using chatApp.CORE.Dtos;
using chatApp.CORE.Models;

namespace chatApp.CORE.interfaces
{
    public interface IProfileRepository : IBaseRepository<Profile>
    {
        Task<object> getProfileById(Guid UserId);
        Task<string> CompleteProfile(Guid UserId, ProfileDto profile);
    }
}
