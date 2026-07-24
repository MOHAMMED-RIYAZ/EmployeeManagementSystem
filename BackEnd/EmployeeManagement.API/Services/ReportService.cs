using EmployeeManagement.API.Data;
using EmployeeManagement.API.Interfaces;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.API.DTOs.Reports;
using EmployeeManagement.API.DTOs;
namespace EmployeeManagement.API.Services
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;


        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<object> GetHiringTrends()
{
    var result = await _context.Employees
        .GroupBy(e => new
        {
            e.DateOfJoining.Year,
            e.DateOfJoining.Month
        })
        .Select(g => new
        {
            Year = g.Key.Year,
            Month = new DateTime(
                g.Key.Year,
                g.Key.Month,
                1
            ).ToString("MMMM"),

            EmployeeCount = g.Count()
        })
        .ToListAsync();


    return result;
}

public async Task<object> GetDepartmentGrowth()
{
    var currentYear = DateTime.Now.Year;
    var previousYear = currentYear - 1;


    var result = await _context.Employees
        .GroupBy(e => e.Department)
        .Select(g => new
        {
            Department = g.Key,

            PreviousYearCount = g.Count(e =>
                e.DateOfJoining.Year == previousYear),

            CurrentYearCount = g.Count(e =>
                e.DateOfJoining.Year == currentYear)
        })
        .ToListAsync();


    var growthResult = result.Select(x => new
    {
        x.Department,

        x.PreviousYearCount,

        x.CurrentYearCount,

        GrowthPercentage =
            x.PreviousYearCount == 0
            ? 0
            :
            ((double)(x.CurrentYearCount - x.PreviousYearCount)
            / x.PreviousYearCount) * 100
    });


    return growthResult;
}
public async Task<List<AttendanceReportDto>> GetAttendancePattern()
{
    var employees = await _context.Employees
        .Include(e => e.Attendances)
        .ToListAsync();


    var result = employees.Select(e =>
    {
        var totalDays = e.Attendances.Count;


        var present = e.Attendances
            .Count(a => a.Status == "Present");


        var absent = e.Attendances
            .Count(a => a.Status == "Absent");


        var leave = e.Attendances
            .Count(a => a.Status == "Leave");


        var percentage = totalDays == 0
            ? 0
            : ((double)present / totalDays) * 100;


        return new AttendanceReportDto
        {
            EmployeeName = e.Name,

            Present = present,

            Absent = absent,

            Leave = leave,

            AttendancePercentage = Math.Round(percentage, 2)
        };

    }).ToList();


    return result;
}
public async Task<List<PerformanceReportDto>> GetPerformanceReport()
{
    var result = await _context.Performances
        .Include(p => p.Employee)
        .Select(p => new PerformanceReportDto
        {
            EmployeeName = p.Employee.Name,

            Rating = p.Rating,

            Comments = p.Comments,

            ReviewDate = p.ReviewDate

        })
        .ToListAsync();


    return result;
}

    }
}