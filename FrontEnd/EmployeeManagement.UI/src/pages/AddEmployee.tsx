import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/employeeService";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    dateOfJoining: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (employee.name.trim().length < 3) {
      toast.error("Name must have minimum 3 characters");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(employee.name)) {
      toast.error("Name should contain only letters");
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(employee.email)) {
      toast.error("Email must end with @gmail.com");
      return false;
    }

    if (employee.phone.length === 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (!/^[0-9]+$/.test(employee.phone)) {
      toast.error("Phone number should contain only numbers");
      return;
    }

    if (employee.salary === "" || Number(employee.salary) <= 0) {
      toast.error("Salary must be greater than 0");
      return false;
    }

    const selectedDate = new Date(employee.dateOfJoining);
    const today = new Date();

    if (selectedDate > today) {
      toast.error("Date of joining cannot be future date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createEmployee({
        ...employee,
        salary: Number(employee.salary),
      });

      toast.success("Employee Added Successfully");

      navigate("/employees");
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message || "Failed to add employee");
      } else {
        toast.error("Server error");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Add Employee</h3>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Name</label>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>

                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={employee.phone}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (/^\d*$/.test(value)) {
                            setEmployee({
                              ...employee,
                              phone: value,
                            });
                          } else {
                            toast.error(
                              "Phone number should contain only numbers",
                            );
                          }
                        }}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Department</label>

                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Designation</label>

                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Salary</label>

                      <input
                        type="text"
                        className="form-control"
                        name="salary"
                        value={employee.salary}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Allow only numbers
                          if (/^\d*$/.test(value)) {
                            setEmployee({
                              ...employee,
                              salary: value,
                            });
                          }
                        }}
                        placeholder="Enter salary"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date Of Joining</label>

                      <input
                        type="date"
                        className="form-control"
                        name="dateOfJoining"
                        value={employee.dateOfJoining}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate("/employees")}
                    >
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-success">
                      Save Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
