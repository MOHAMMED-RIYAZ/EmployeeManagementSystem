using EmployeeManagement.API.DTOs.Reports;
using EmployeeManagement.API.DTOs;

namespace EmployeeManagement.API.Interfaces
{
    public interface IReportService
    {
        Task<object> GetHiringTrends();

        Task<object> GetDepartmentGrowth();

        Task<List<AttendanceReportDto>> GetAttendancePattern();
        Task<List<PerformanceReportDto>> GetPerformanceReport();
    }
}