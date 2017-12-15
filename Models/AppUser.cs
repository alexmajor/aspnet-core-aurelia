using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AWC.ActivityPortal.Models
{
    public class AppUser : IdentityUser
    {
        [Required]
        [MaxLength(75)]
        public string FirstName { get; set; }
        
        [Required]
        [MaxLength(75)]
        public string LastName { get; set; }

        [NotMapped]
        public string Password { get; set; }
    }
}
