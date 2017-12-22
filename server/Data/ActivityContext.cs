using System;
using System.Linq;
using AWC.ActivityPortal.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AWC.ActivityPortal.Data
{
    public class ActivityContext : IdentityDbContext<AppUser>
    {
        public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public string CurrentUser { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            modelBuilder.RemovePluralizingTableNameConvention();

            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            AddTimeStamps();
            return base.SaveChanges();
        }

        private void AddTimeStamps()
        {
            var entites = ChangeTracker.Entries()
                            .Where(e => e.Entity is EntityBase && (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entites)
            {
                var entity = entry.Entity as EntityBase;
                var currentUser = CurrentUser ?? "SYSTEM";
                if (entity == null)
                {
                    continue;
                }

                if (entry.State == EntityState.Added)
                {
                    entity.CreateBy = this.CurrentUser;
                    entity.CreateDate = DateTime.Now;
                }
                entity.ModifyBy = this.CurrentUser;
                entity.ModifyDate = DateTime.Now;
            }
        }
    }
}
