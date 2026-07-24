using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Controllers;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeRepository _repository;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<EmployeeController> _logger;
    private readonly IPdfService _pdfService;
  

public EmployeeController(
    IEmployeeRepository repository,
    IUserRepository userRepository,
    ILogger<EmployeeController> logger,
       IPdfService pdfService)
{
    _repository = repository;
    _userRepository = userRepository;
    _logger = logger;
     _pdfService = pdfService;
   
}

   
[Authorize(Roles = "Admin,User")]
[HttpGet]
public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
{
        _logger.LogInformation("Fetching all employees.");
    var employees = await _repository.GetAllAsync();
    return Ok(employees);
}


[Authorize(Roles = "Admin,User")]
[HttpGet("{id}")]
public async Task<ActionResult<Employee>> GetEmployee(int id)
{
    var employee = await _repository.GetByIdAsync(id);

    if (employee == null)
        return NotFound();

    return Ok(employee);
}

[Authorize(Roles = "Admin")]
[HttpPost]
public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
{
     _logger.LogInformation("Creating employee: {Name}", employee.Name);
    var createdEmployee = await _repository.AddAsync(employee);

    return CreatedAtAction(nameof(GetEmployee),
        new { id = createdEmployee.Id },
        createdEmployee);
}


[Authorize(Roles = "Admin")]
[HttpPut("{id}")]
public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
{
    _logger.LogInformation("Updating employee with Id: {Id}", id);
    if (id != employee.Id)
        return BadRequest();

    await _repository.UpdateAsync(employee);

    return NoContent();
}
[HttpGet("test-error")]
public IActionResult TestError()
{
    throw new Exception("Test exception");
}
[Authorize]
[HttpGet("my-profile")]
public async Task<IActionResult> GetMyProfile()
{
    var username = User.Identity?.Name;

    if (username == null)
    {
        return Unauthorized();
    }


    var user = await _userRepository.GetByUsernameAsync(username);


    if (user == null)
    {
        return NotFound("User not found");
    }


    if (user.EmployeeId == null)
    {
        return NotFound("Employee profile not linked");
    }


    var employee = await _repository.GetByIdAsync(user.EmployeeId.Value);


    if (employee == null)
    {
        return NotFound("Employee not found");
    }


    return Ok(employee);
}

[Authorize(Roles = "Admin")]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteEmployee(int id)
{
    _logger.LogInformation("Deleting employee with Id: {Id}", id);
    var employee = await _repository.GetByIdAsync(id);

    if (employee == null)
        return NotFound();

    await _repository.DeleteAsync(employee);

    return NoContent();
}
[HttpGet("download-pdf")]
[Authorize(Roles = "Admin")]
public async Task<IActionResult> DownloadPdf()
{
    var employees = await _repository.GetAllAsync();

    var pdf = _pdfService.GenerateEmployeesPdf(employees.ToList());

    return File(
        pdf,
        "application/pdf",
        "Employees.pdf");
}
}