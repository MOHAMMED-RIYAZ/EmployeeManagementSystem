using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Interfaces
{
    public interface IPdfService
    {
        byte[] GenerateEmployeesPdf(List<Employee> employees);
    }
}