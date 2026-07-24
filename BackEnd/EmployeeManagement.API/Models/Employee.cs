using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.API.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Department { get; set; } = string.Empty;

        [Required]
        public string Designation { get; set; } = string.Empty;

        [Range(1, 10000000)]
        public decimal Salary { get; set; }

        [Required]
        public DateTime DateOfJoining { get; set; }

         public ICollection<Attendance> Attendances { get; set; } 
            = new List<Attendance>();

        public ICollection<Performance> Performances { get; set; } 
            = new List<Performance>();
    }
}