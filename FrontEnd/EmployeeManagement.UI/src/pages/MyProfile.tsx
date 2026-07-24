import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyProfile } from "../services/employeeService";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  dateOfJoining: string;
}

const MyProfile = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setEmployee(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>My Profile</h3>
          </div>

          <div className="card-body">
            {employee && (
              <>
                <p>
                  <b>Name:</b> {employee.name}
                </p>

                <p>
                  <b>Email:</b> {employee.email}
                </p>

                <p>
                  <b>Phone:</b> {employee.phone}
                </p>

                <p>
                  <b>Department:</b> {employee.department}
                </p>

                <p>
                  <b>Designation:</b> {employee.designation}
                </p>

                <p>
                  <b>Date Of Joining:</b>
                  {employee.dateOfJoining.substring(0, 10)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
