using Azure.Core;
using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace chatApp.EF.Repositories
{
    public class ProfileRepository : BaseRepository<Profile>, IProfileRepository
    {

        public ProfileRepository(ApplicationContext context) : base(context)
        {

        }
        public async Task<object> getProfileById(Guid UserId)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            var Profile = _context.Profiles.FirstOrDefault(u => u.UserId == UserId);
            var ProfileDto = new
            {
                ProfilePicture = Profile.ProfilePicture,
                CovoerPicture = Profile.CovoerPicture,
                Bio = Profile.Bio,
                WorkPlace = Profile.WorkPlace,
                Study = Profile.Study,
                Situation = Profile.Situation,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                DateOfBirth = user.DateOfBirth

            };
            return ProfileDto;
        }


        private string StorePicture(string  picturePath, string pictureName)
        {
            var imageBytes = Convert.FromBase64String(picturePath);
            var uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "images");
            var fileName = $"{pictureName}.png";
            var filePath = Path.Combine(uploadsDirectory, fileName);
            System.IO.File.WriteAllBytes(filePath, imageBytes);
            return filePath;
        }

        public async  Task<string> CompleteProfile(Guid UserId, ProfileDto profile)
        {
            try
            {
                if(UserId != null)
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u=>u.Id == UserId);
                    try
                    {
                        if(profile.ProfilePicture != null)
                        {
                          profile.ProfilePicture = StorePicture(profile.ProfilePicture, $"{user.FirstName}-{user.LastName}-ProfilePicture");
                        }
                        else
                        {
                            profile.ProfilePicture = "";
                        }
                        if (profile.CovoerPicture != null)
                        {
                            profile.CovoerPicture = StorePicture(profile.CovoerPicture, $"{user.FirstName}-{user.LastName}-CoverPicture");
                        }
                        else
                        {
                            profile.CovoerPicture = "";
                        }
                    }
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }
                    var profileToAdd = new Profile
                    {
                        ProfilePicture = profile.ProfilePicture,
                        CovoerPicture= profile.CovoerPicture,
                        Bio= profile.Bio ?? "",
                        WorkPlace = profile.WorkPlace ?? "",
                        Study = profile.Study ?? "",
                        Situation =profile.Situation ?? "",
                        UserId = UserId,
                    };
                    _context.Profiles.Add(profileToAdd);
                }
                return "profile is successfully completed";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            
        }
    }
}
