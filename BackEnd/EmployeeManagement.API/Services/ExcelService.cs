using ClosedXML.Excel;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Services
{
    public class ExcelService : IExcelService
    {
        public byte[] GenerateEmployeesExcel(List<Employee> employees)
        {
            using var workbook = new XLWorkbook();

            var worksheet = workbook.Worksheets.Add("Employees");

            worksheet.Cell(1, 1).Value = "Id";
            worksheet.Cell(1, 2).Value = "Name";
            worksheet.Cell(1, 3).Value = "Email";
            worksheet.Cell(1, 4).Value = "Phone";
            worksheet.Cell(1, 5).Value = "Department";
            worksheet.Cell(1, 6).Value = "Designation";
            worksheet.Cell(1, 7).Value = "Salary";
            worksheet.Cell(1, 8).Value = "Date Of Joining";

            var row = 2;

            foreach (var employee in employees)
            {
                worksheet.Cell(row, 1).Value = employee.Id;
                worksheet.Cell(row, 2).Value = employee.Name;
                worksheet.Cell(row, 3).Value = employee.Email;
                worksheet.Cell(row, 4).Value = employee.Phone;
                worksheet.Cell(row, 5).Value = employee.Department;
                worksheet.Cell(row, 6).Value = employee.Designation;
                worksheet.Cell(row, 7).Value = employee.Salary;
                worksheet.Cell(row, 8).Value = employee.DateOfJoining;

                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            return stream.ToArray();
        }
    }
}