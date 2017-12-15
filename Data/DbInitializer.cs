using AWC.ActivityPortal.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AWC.ActivityPortal.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ActivityContext context)
        {
            context.Database.EnsureCreated();

            if (context.Employees.Any())
            {
                return;   // DB has been seeded
            }

            var activities = new List<Activity>
            {
              new Activity
              {
                Name = "Spelunking"
              },
              new Activity
              {
                Name = "Journalism"
              },
              new Activity
              {
                Name = "Running"
              },
              new Activity
              {
                Name = "Fencing"
              },
              new Activity
              {
                Name = "Programming"
              }
            };
            foreach (var activity in activities)
            {
                context.Activities.Add(activity);
            }
            context.SaveChanges();

            var employees = new List<Employee>
            {
                new Employee
                {
                  Identity = new AppUser
                {
                    UserName = "thebatman",
                    FirstName = "Bruce",
                    LastName = "Wayne",
                    Email = "bruce@wayneindustries.com",
                    EmailConfirmed = true
                },
                    Activity = context.Activities.Single(a=>a.Name == "Spelunking")
                },
                new Employee
                {
                  Identity = new AppUser
                  {
                      UserName = "superman",
                      FirstName = "Clark",
                      LastName = "Kent",
                      Email = "clark.kent@dailyplanet.com",
                      EmailConfirmed = true
                  },
                  Activity = context.Activities.Single(a=>a.Name == "Journalism")
                },
                new Employee
                {
                  Identity = new AppUser
                  {
                      UserName = "flash",
                      FirstName = "Barry",
                      LastName = "Allen",
                      Email = "ballen@scpd.org",
                      EmailConfirmed = true
                  },
                  Activity = context.Activities.Single(a=>a.Name == "Running")
                },
                new Employee
                {
                  Identity = new AppUser
                  {
                      UserName = "wwomen",
                      FirstName = "Diana",
                      LastName = "Prince",
                      Email = "princess@gmail.com",
                      EmailConfirmed = true
                  },
                  Activity = context.Activities.Single(a=>a.Name == "Fencing")
                },
                new Employee
                {
                  Identity = new AppUser
                  {
                      UserName = "cyborg",
                      FirstName = "Victor",
                      LastName = "Stone",
                      Email = "stone@outlook.com",
                      EmailConfirmed = true
                  },
                  Activity = context.Activities.Single(a=>a.Name == "Programming")
                }
            };

            foreach (var employee in employees)
            {
                if (!context.Employees.Any(e => e.Identity.UserName == employee.Identity.UserName))
                {
                    var password = new PasswordHasher<AppUser>();
                    var hashed = password.HashPassword(employee.Identity, "secret");
                    employee.Identity.PasswordHash = hashed;
                }
                context.Employees.Add(employee);
            }
            context.SaveChanges();
        }
    }
}
