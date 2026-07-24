using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceRepository _repository;


        public AttendanceController(
            IAttendanceRepository repository)
        {
            _repository = repository;
        }



        [HttpPost]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> AddAttendance(
            CreateAttendanceDto dto)
        {

            var attendance = new Attendance
            {
                EmployeeId = dto.EmployeeId,
                Date = dto.Date,
                Status = dto.Status
            };


            var result = await _repository.AddAsync(attendance);


            return Ok(result);
        }




        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllAsync();

            return Ok(result);
        }




        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetByEmployee(
            int employeeId)
        {
            var result =
                await _repository.GetByEmployeeIdAsync(employeeId);


            return Ok(result);
        }
    }
}