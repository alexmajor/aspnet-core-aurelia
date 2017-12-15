using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AWC.ActivityPortal.Data;
using AWC.ActivityPortal.Helpers;
using AWC.ActivityPortal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AWC.ActivityPortal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private ActivityContext _context;
        private IAuthenticateService _authenticateService;

        public EmployeesController(ActivityContext context, IAuthenticateService authenticateService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _context.CurrentUser = UserHelper.GetCurrentUsername(httpContextAccessor.HttpContext.User);
            _authenticateService = authenticateService;
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AppUser appUser)
        {
            var user = _authenticateService.Authenticate(appUser.UserName, appUser.Password);

            if (user == null)
                return Unauthorized();

            var employee = _context.Employees.SingleOrDefault(e => e.IdentityId == user.Id);
            return new OkObjectResult(employee);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]Employee employee)
        {
            try
            {
                var user = _authenticateService.Create(employee.Identity, employee.Identity.Password);
                employee.Identity = user;
                _context.Employees.Add(employee);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Employee employee)
        {
            try
            {
                if (employee == null)
                    throw new ArgumentNullException("employee");

                var user = _authenticateService.Update(employee.Identity, employee.Identity.Password);
                employee.Identity = user;
                _context.Employees.Update(employee);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        public IActionResult Get()
        {
            return new OkObjectResult(_context.Employees);
        }

        public IActionResult Get(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            return new OkObjectResult(_context.Employees
            .Include(e => e.Activity)
            .Include(e => e.Comments)
            .SingleOrDefault(e => e.Id == id));
        }
    }
}
