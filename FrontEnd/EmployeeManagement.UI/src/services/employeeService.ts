import api from "../api/axios";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  dateOfJoining: string;
}

export const getEmployees = async () => {
  const response = await api.get<Employee[]>("/Employee");
  return response.data;
};

export const createEmployee = async (employee: Omit<Employee, "id">) => {
  const response = await api.post("/Employee", employee);
  return response.data;
};
export const getEmployeeById = async (id: number) => {
  const response = await api.get<Employee>(`/Employee/${id}`);
  return response.data;
};

export const updateEmployee = async (id: number, employee: any) => {
  await api.put(`/Employee/${id}`, employee);
};
export const deleteEmployee = async (id: number) => {
  await api.delete(`/Employee/${id}`);
};
export const getMyProfile = async () => {
  const response = await api.get("/Employee/my-profile");
  return response.data;
};
