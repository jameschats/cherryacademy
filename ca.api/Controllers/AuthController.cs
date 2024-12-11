using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using ca.api.Data;
using ca.api.DTOModels;
using ca.api.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ca.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // private readonly IAuthService _AuthService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthController(IWebHostEnvironment hostingEnvironment,
        IConfiguration config, DataContext context)
        // DataContextProcedures contextProcedures)
        {
        //    _AuthService = AuthService;
            _hostingEnvironment = hostingEnvironment;
             _config = config;
             _context = context;
             //_contextProcedures = contextProcedures;
        }
        

  [HttpPost("register")]
        public async Task<ActionResult<IEnumerable<RegisterModel>>> Register(RegisterModel model)
        {
            try
            {
                var token = await RegisterUser(model);
                dynamic tokendata = new
                {
                    AccessToken = token,
                };
                return Ok(tokendata);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }
        }

        private async Task<dynamic> RegisterUser(RegisterModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException(nameof(model), "Model object is null.");
            }

            model.Email = model.Email.ToLower();
            Console.WriteLine("1");
            if (await UserExists(model.Email))
                throw new Exception("Email already exists");
            Console.WriteLine("2");
            // byte[] passwordHash, passwordSalt;
            // CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

            // string PasswordSalt = Convert.ToBase64String(passwordSalt);
            // string PasswordHash = Convert.ToBase64String(passwordHash);



            var newUser = new Tbluser
            {
                CreatedOn = DateTime.Now,                
                IsDeleted = false,
                Name = model.Name,                
                Email = model.Email,                
                Password = model.Password                

            };

            _context.Tblusers.Add(newUser);
            await _context.SaveChangesAsync();
            var Expiresdate = DateTime.Now.AddYears(10);

            var Token = CreateToken(model.Email, newUser.Id, Expiresdate);
            newUser.Token = Token;
            _context.Tblusers.Update(newUser);
            await _context.SaveChangesAsync();

          
            return Token;

        }

        
        private async Task<bool> UserExists(string email)
        {
            if (await _context.Tblusers.AnyAsync(x => x.Email == email))
                return true;

            return false;
        }

         private string CreateToken(string email, long id, DateTime date)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            // Add multiple claims
            var claims = new[]
            {
                    new Claim(ClaimTypes.Name, email.ToLower()),
                    new Claim(ClaimTypes.Email, email),
                    new Claim("Userid", id.ToString()),

                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = date,
                SigningCredentials = creds,
                Issuer = _config["Jwt:Issuer"],  // 'iss' claim (issuer)
                Audience = _config["Jwt:Audience"],  // 'aud' claim (audience)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var token_updated = tokenHandler.WriteToken(token);

            return token_updated;
        }
        private async Task<Tbluser> VerifyLogin(string user, string password)
        {
            var oUser = await _context.Tblusers.FirstOrDefaultAsync(x => x.Email.ToLower() == user && x.Password.ToLower() == password.ToLower());


            // if (!VerifyPasswordHash(password, oUser.PasswordHash, oUser.PasswordSalt))
            //     return null;

            if (oUser == null)
               return null;

            return oUser;
        }

         [HttpPost("login")]
        public async Task<ActionResult<IEnumerable<LoginModel>>> Login(LoginModel model)
        {
            try
            {
                var token = await LoginUser(model);
                dynamic tokendata = new
                {
                    AccessToken = token,
                };
                return Ok(tokendata);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }
        }

        
        private async Task<dynamic> LoginUser(LoginModel login)
        {

            login.Email = login.Email.ToLower();
            Console.WriteLine("1");

            if (!await UserExists(login.Email))
                throw new Exception("Email doesn't exists");

            Console.WriteLine("2");
            var userFromRepo = await VerifyLogin(login.Email.ToLower(), login.Password);

            if (userFromRepo == null)
                throw new Exception("Incorrect Username or Password");

            var user = await _context.Tblusers.Where(x => x.IsDeleted == false && x.Email == login.Email)
            .SingleOrDefaultAsync();

            if (user == null)
                throw new Exception("User not found");

            if (!string.IsNullOrEmpty(user.Token))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(user.Token) as JwtSecurityToken;

                if (jwtToken != null)
                {
                    var exp = jwtToken.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp)?.Value;

                    if (exp != null && DateTimeOffset.FromUnixTimeSeconds(long.Parse(exp)) > DateTime.UtcNow)
                    {
                        return user.Token;
                    }
                }
            }

            var Expiresdate = DateTime.Now.AddYears(10);
            var newToken = CreateToken(user.Email, user.Id, Expiresdate);


            user.Token = newToken;

            _context.Tblusers.Update(user);
            await _context.SaveChangesAsync();

            return newToken;

        }


}
}