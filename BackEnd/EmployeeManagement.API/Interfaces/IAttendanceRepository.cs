using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<Attendance> AddAsync(Attendance attendance);

        Task<List<Attendance>> GetAllAsync();

        Task<List<Attendance>> GetByEmployeeIdAsync(int employeeId);
    }
}
