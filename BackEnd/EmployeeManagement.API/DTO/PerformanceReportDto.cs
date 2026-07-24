namespace EmployeeManagement.API.DTOs
{
    public class PerformanceReportDto
    {
        public string EmployeeName { get; set; } = string.Empty;

        public double Rating { get; set; }

        public string Comments { get; set; } = string.Empty;

        public DateTime ReviewDate { get; set; }
    }
}