using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Services;
using Microsoft.AspNetCore.Mvc;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

[HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto registerDto)
{
    if (await _userRepository.UserExistsAsync(registerDto.Username))
    {
        return BadRequest("Username already exists.");
    }

    var user = new User
    {
        Username = registerDto.Username,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
        Role = registerDto.Role
    };

    await _userRepository.AddUserAsync(user);
    await _userRepository.SaveAsync();

    return Ok(new
    {
        Message = "User registered successfully."
    });
}

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(
                loginDto.Password,
                user.PasswordHash);

            if (!isValidPassword)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _jwtService.GenerateToken(user.Username, user.Role);

            return Ok(new
            {
                Token = token
            });
        }
    }
}