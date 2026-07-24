using EmployeeManagement.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EmployeeManagement.API.Data;
using Microsoft.EntityFrameworkCore;
namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly IPdfService _pdfService;
        private readonly ApplicationDbContext _context;
        private readonly IExcelService _excelService;


       public ReportsController(
            ApplicationDbContext context,
    IReportService reportService,
    IPdfService pdfService,
     IExcelService excelService)
{
    _reportService = reportService;
    _pdfService = pdfService;
    _context=context;
    _excelService = excelService;;
}


        [HttpGet("hiring-trends")]
        public async Task<IActionResult> GetHiringTrends()
        {
            var result = await _reportService.GetHiringTrends();

            return Ok(result);
        }
        // GET: api/reports/department-growth

[HttpGet("department-growth")]
public async Task<IActionResult> GetDepartmentGrowth()
{
    var result = await _reportService.GetDepartmentGrowth();

    return Ok(result);
}
// GET api/reports/attendance-pattern

[HttpGet("attendance-pattern")]
public async Task<IActionResult> GetAttendancePattern()
{
    var result = await _reportService.GetAttendancePattern();

    return Ok(result);
}
[HttpGet("performance")]
public async Task<IActionResult> GetPerformance()
{
    var result = await _reportService.GetPerformanceReport();

    return Ok(result);
}
[HttpGet("employees/pdf")]
public async Task<IActionResult> EmployeePdf()
{
    var employees = await _context.Employees.ToListAsync();


  var pdf = _pdfService.GenerateEmployeesPdf(employees);


    return File(
        pdf,
        "application/pdf",
        "EmployeeReport.pdf"
    );
}
[HttpGet("employees/excel")]
public async Task<IActionResult> EmployeeExcel()
{
    var employees = await _context.Employees.ToListAsync();

    var excel = _excelService.GenerateEmployeesExcel(employees);

    return File(
        excel,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "EmployeeReport.xlsx");
}
    }
    
}