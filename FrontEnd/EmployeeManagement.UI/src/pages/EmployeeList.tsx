import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import type { Employee } from "../services/employeeService";
import { getRole } from "../services/authService";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
const EmployeeList = () => {
  const navigate = useNavigate();
  const role = getRole();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const employeesPerPage = 5;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees();
      setEmployees(data);
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      toast.success("Employee Deleted Successfully");

      const updatedEmployees = employees.filter((emp) => emp.id !== id);
      setEmployees(updatedEmployees);

      const newTotalPages = Math.ceil(
        updatedEmployees.length / employeesPerPage,
      );

      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  const downloadPdf = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5263/api/Reports/employees/pdf",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        toast.error("Failed to download PDF");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "EmployeeReport.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success("PDF Downloaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error downloading PDF");
    }
  };

  const downloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5263/api/Reports/employees/excel", // Change port if needed
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        toast.error("Failed to download Excel");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "EmployeeReport.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Excel Downloaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error downloading Excel");
    }
  };
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase()) ||
      employee.phone.toLowerCase().includes(search.toLowerCase()),
  );
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div>
          <button className="btn btn-success me-2" onClick={downloadPdf}>
            Download PDF
          </button>

          <button className="btn btn-info me-2" onClick={downloadExcel}>
            Download Excel
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/employees/add")}
          >
            Add Employee
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email, Department..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="mt-3">Loading Employees...</p>
          </div>
        ) : (
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                {role === "Admin" && <th>Salary</th>}
                <th>Date Of Joining</th>
                {role === "Admin" && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                currentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>{employee.designation}</td>
                    {role === "Admin" && <td>₹ {employee.salary}</td>}
                    <td>{employee.dateOfJoining?.substring(0, 10)}</td>

                    {role === "Admin" && (
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(`/employees/edit/${employee.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === "Admin" ? 9 : 8}>No Employees Found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="btn btn-secondary ms-2"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
