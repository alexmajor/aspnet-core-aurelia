using System;

namespace AWC.ActivityPortal.Models
{
    public class EntityBase
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateBy { get; set; }
        public DateTime ModifyDate { get; set; }
        public string ModifyBy { get; set; }
    }
}
