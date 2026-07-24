import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    dateOfJoining: "",
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const data = await getEmployeeById(Number(id));

      setEmployee({
        ...data,
        salary: data.salary.toString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "salary") {
      if (/^\d*$/.test(value)) {
        setEmployee({
          ...employee,
          salary: value,
        });
      }
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (employee.name.trim().length < 3) {
      toast.error("Name must have minimum 3 characters");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(employee.name)) {
      toast.error("Name should contain only letters");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(employee.email)) {
      toast.error("Email must end with @gmail.com");
      return;
    }

    if (employee.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (!/^[0-9]+$/.test(employee.phone)) {
      toast.error("Phone number should contain only numbers");
      return;
    }

    if (employee.salary === "" || Number(employee.salary) <= 0) {
      toast.error("Salary must be greater than 0");
      return;
    }

    const selectedDate = new Date(employee.dateOfJoining);
    const today = new Date();

    if (selectedDate > today) {
      toast.error("Date of joining cannot be future date");
      return;
    }

    try {
      await updateEmployee(Number(id), {
        ...employee,
        salary: Number(employee.salary),
      });

      toast.success("Employee Updated Successfully");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    }
  };
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-warning text-dark">
            <h3>Edit Employee</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Phone</label>
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
                      toast.error("Phone number should contain only numbers");
                    }
                  }}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Department</label>
                <input
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Designation</label>
                <input
                  className="form-control"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  placeholder="Enter salary"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Date Of Joining</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfJoining"
                  value={employee.dateOfJoining?.substring(0, 10)}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-warning">Update Employee</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
