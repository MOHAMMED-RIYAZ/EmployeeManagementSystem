using EmployeeManagement.API.Data;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly ApplicationDbContext _context;


        public AttendanceRepository(ApplicationDbContext context)
        {
            _context = context;
        }


     public async Task<Attendance> AddAsync(Attendance attendance)
{
    _context.Attendances.Add(attendance);

    await _context.SaveChangesAsync();


    return await _context.Attendances
        .Include(x => x.Employee)
        .FirstAsync(x => x.Id == attendance.Id);
}



        public async Task<List<Attendance>> GetAllAsync()
        {
            return await _context.Attendances
                .Include(x => x.Employee)
                .ToListAsync();
        }



        public async Task<List<Attendance>> GetByEmployeeIdAsync(int employeeId)
        {
            return await _context.Attendances
                .Where(x => x.EmployeeId == employeeId)
                .Include(x => x.Employee)
                .ToListAsync();
        }
    }
}