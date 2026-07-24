namespace EmployeeManagement.API.DTOs.Reports
{
    public class AttendanceReportDto
    {
        public string EmployeeName { get; set; } = string.Empty;

        public int Present { get; set; }

        public int Absent { get; set; }

        public int Leave { get; set; }

        public double AttendancePercentage { get; set; }
    }
}