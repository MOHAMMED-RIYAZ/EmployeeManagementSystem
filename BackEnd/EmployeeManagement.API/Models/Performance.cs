namespace EmployeeManagement.API.Models
{
    public class Performance
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public Employee? Employee { get; set; }

        public double Rating { get; set; }

        public string Comments { get; set; } = string.Empty;

        public DateTime ReviewDate { get; set; }
    }
}