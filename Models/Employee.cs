using System;
using System.Collections.Generic;

namespace AWC.ActivityPortal.Models
{
    public class Employee : EntityBase
    {
        public int ActivityId { get; set; }

        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }
        public Activity Activity { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}
