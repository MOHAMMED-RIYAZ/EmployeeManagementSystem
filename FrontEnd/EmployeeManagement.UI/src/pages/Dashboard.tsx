import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getEmployees } from "../services/employeeService";
import { getRole } from "../services/authService";
import type { Employee } from "../services/employeeService";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = getRole();

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalEmployees = employees.length;

  const totalDepartments = new Set(employees.map((e) => e.department)).size;

  const totalSalary = employees.reduce((sum, e) => sum + Number(e.salary), 0);

  const averageSalary =
    totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  const highestSalary =
    totalEmployees > 0
      ? Math.max(...employees.map((e) => Number(e.salary)))
      : 0;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Dashboard</h2>

        <div className="row">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card text-white bg-primary shadow h-100">
              <div className="card-body text-center">
                <h5>Total Employees</h5>
                <h2>{totalEmployees}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card text-white bg-success shadow h-100">
              <div className="card-body text-center">
                <h5>Departments</h5>
                <h2>{totalDepartments}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card text-dark bg-warning shadow h-100">
              <div className="card-body text-center">
                <h5>Average Salary</h5>
                <h2>₹ {averageSalary.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card text-white bg-danger shadow h-100">
              <div className="card-body text-center">
                <h5>Highest Salary</h5>
                <h2>₹ {highestSalary.toLocaleString()}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mt-4">
          <div className="card-body">
            <h5 className="mb-3">Logged in User</h5>

            <p className="mb-2">
              <strong>Role:</strong>{" "}
              <span className="badge bg-dark fs-6">{role}</span>
            </p>

            <div className="mt-4">
              {role === "Admin" ? (
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/employees")}
                  >
                    View Employees
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/employees/add")}
                  >
                    Add Employee
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
