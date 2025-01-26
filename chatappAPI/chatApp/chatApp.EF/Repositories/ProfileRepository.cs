using chatApp.CORE.Dtos;
using chatApp.CORE.interfaces;
using chatApp.CORE.Models;
using Microsoft.EntityFrameworkCore;

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
            var Posts = _context.Posts.Where(u => u.UserId == UserId);
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
                DateOfBirth = user.DateOfBirth,
                Posts = Posts.Count()

            };
            return ProfileDto;
        }


        private string StorePicture(string picturePath, string pictureName)
        {
            try
            {

           
            var imageBytes = Convert.FromBase64String(picturePath);
            var uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "images");
            if (!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            var fileName = $"{pictureName}.png";
            var filePath = Path.Combine(uploadsDirectory, fileName);
            System.IO.File.WriteAllBytes(filePath, imageBytes);
            return filePath;
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> CompleteProfile(string UserId, ProfileDto profile)
        {
            try
            {
                if (UserId != null)
                {
                    var profileToComplete = await _context.Profiles.FirstOrDefaultAsync(u => u.UserId == Guid.Parse(UserId));

                    profileToComplete.Bio = profile.Bio ?? "";
                    profileToComplete.WorkPlace = profile.WorkPlace ?? "";
                    profileToComplete.Study = profile.Study ?? "";
                    profileToComplete.Situation = profile.Situation ?? "";
                    _context.Profiles.Update(profileToComplete);
                }
                return "profile is successfully completed";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public async Task<string> updateProfilePicture(string path, string userId)
        {
            try
            {
                // Vérification de l'ID utilisateur
                if (!Guid.TryParse(userId, out var userGuid))
                {
                    return "Invalid user ID format.";
                }

                // Récupération du profil
                var profile = await _context.Profiles.FirstOrDefaultAsync(u => u.UserId == userGuid);
                if (profile == null)
                {
                    return $"No profile found for user ID: {userId}";
                }

                // Récupération de l'utilisateur
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userGuid);
                if (user == null)
                {
                    return $"No user found with ID: {userId}";
                }

                // Vérification du chemin de l'image
                if (string.IsNullOrEmpty(path))
                {
                    return "Image path is empty or null.";
                }

                // Mise à jour de l'image de profil
                var name = $"{user.FirstName}-{user.LastName}-ProfilePicture";
                profile.ProfilePicture = StorePicture(path, name);

                // Mise à jour en base de données
                _context.Profiles.Update(profile);
                await _context.SaveChangesAsync();

                return "Profile picture updated successfully.";
            }
            catch (Exception ex)
            {
                // Enregistrement des détails de l'exception pour le diagnostic
                return $"An error occurred while updating the profile picture: {ex.Message}";
            }
        }

    }
}
