using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);

        Task AddUserAsync(User user);

        Task SaveAsync();

        Task<bool> UserExistsAsync(string username);
    }
}