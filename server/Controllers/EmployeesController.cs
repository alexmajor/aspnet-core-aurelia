using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AWC.ActivityPortal.Data;
using AWC.ActivityPortal.Helpers;
using AWC.ActivityPortal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AWC.ActivityPortal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private ActivityContext _context;
        private IAuthenticateService _authenticateService;
        private readonly AppSettings _appSettings;

        public EmployeesController(ActivityContext context, IAuthenticateService authenticateService, IOptions<AppSettings> appSettings, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _context.CurrentUser = UserHelper.GetCurrentUsername(httpContextAccessor.HttpContext.User);
            _authenticateService = authenticateService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AppUser appUser)
        {
            var user = _authenticateService.Authenticate(appUser.UserName, appUser.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            });
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


        [HttpPatch("{id}")]
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
                return CreatedAtRoute(new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Employees.Include(e => e.Identity));

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            return Ok(_context.Employees
            .Include(e => e.Identity)
            .Include(e => e.Activity)
            .Include(e => e.Comments)
            .SingleOrDefault(e => e.Id == id));
        }
    }
}
