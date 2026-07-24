using EmployeeManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EmployeeManagement.API.Data;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.API.DTOs;

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class PerformanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public PerformanceController(ApplicationDbContext context)
        {
            _context = context;
        }


       [HttpGet]
public async Task<IActionResult> GetAll()
{
    var result = await _context.Performances
        .Include(x => x.Employee)
        .Select(x => new
        {
            x.Id,
            x.EmployeeId,
            EmployeeName = x.Employee.Name,
            x.Rating,
            x.Comments,
            x.ReviewDate
        })
        .ToListAsync();


    return Ok(result);
}
      
        [HttpPost]
public async Task<IActionResult> AddPerformance(CreatePerformanceDto dto)
{
    var performance = new Performance
    {
        EmployeeId = dto.EmployeeId,
        Rating = dto.Rating,
        Comments = dto.Comments,
        ReviewDate = dto.ReviewDate
    };


    _context.Performances.Add(performance);

    await _context.SaveChangesAsync();


    return Ok(performance);
}
    }
}