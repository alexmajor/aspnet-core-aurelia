using System.ComponentModel.DataAnnotations;

namespace AWC.ActivityPortal.Models
{
    public class Activity : EntityBase
    {
        [MaxLength(75)]
        public string Name { get; set; }

    }
}
