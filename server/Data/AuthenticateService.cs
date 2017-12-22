using System;
using System.Linq;
using AWC.ActivityPortal.Models;
using Microsoft.AspNetCore.Identity;

namespace AWC.ActivityPortal.Data
{
    public interface IAuthenticateService
    {
        AppUser Authenticate(string userName, string password);
        AppUser Create(AppUser user, string password);
        AppUser Update(AppUser user, string password = null);
    }

    public class AuthenticateService : IAuthenticateService
    {
        private ActivityContext _context;

        public AuthenticateService(ActivityContext context)
        {
            _context = context;
        }

        public AppUser Authenticate(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.AppUsers.SingleOrDefault(x => x.UserName == userName);

            if (user == null)
                return null;

            var passwordHasher = new PasswordHasher<AppUser>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result != PasswordVerificationResult.Success)
                return null;

            return user;
        }

        public AppUser Create(AppUser user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (_context.AppUsers.Any(x => x.UserName == user.UserName))
                throw new Exception("UserName " + user.UserName + " is already taken");

            var passwordHasher = new PasswordHasher<AppUser>();
            user.PasswordHash = passwordHasher.HashPassword(user, password);

            _context.AppUsers.Add(user);
            _context.SaveChanges();

            return user;
        }

        public AppUser Update(AppUser userParam, string password = null)
        {
            var user = _context.AppUsers.Find(userParam.Id);

            if (user == null)
                throw new Exception("User not found");

            if (userParam.UserName != user.UserName)
            {
                // UserName has changed so check if the new UserName is already taken
                if (_context.AppUsers.Any(x => x.UserName == userParam.UserName))
                    throw new Exception("UserName " + userParam.UserName + " is already taken");
            }

            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.Email = userParam.Email;
            user.UserName = userParam.UserName;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                var passwordHasher = new PasswordHasher<AppUser>();
                user.PasswordHash = passwordHasher.HashPassword(user, password);
            }

            _context.AppUsers.Update(user);
            _context.SaveChanges();

            return user;            
        }
    }
}
