using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Interfaces
{
    public interface IExcelService
    {
        byte[] GenerateEmployeesExcel(List<Employee> employees);
    }
}