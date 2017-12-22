using System.ComponentModel.DataAnnotations;

namespace AWC.ActivityPortal.Models
{
    public class Comment : EntityBase
    {
        [Required]
        [MaxLength(240)]
        public string Message { get; set; }

    }
}
