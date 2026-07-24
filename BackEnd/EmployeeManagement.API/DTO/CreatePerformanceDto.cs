namespace EmployeeManagement.API.DTOs
{
    public class CreatePerformanceDto
    {
        public int EmployeeId { get; set; }

        public double Rating { get; set; }

        public string Comments { get; set; } = string.Empty;

        public DateTime ReviewDate { get; set; }
    }
}