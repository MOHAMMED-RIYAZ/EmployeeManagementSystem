import axios from "axios";

const API_URL = "http://localhost:5263/api/Reports";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getHiringTrends = async () => {
  const response = await axios.get(`${API_URL}/hiring-trends`, getConfig());
  return response.data;
};

export const getDepartmentGrowth = async () => {
  const response = await axios.get(`${API_URL}/department-growth`, getConfig());
  return response.data;
};

export const getAttendancePattern = async () => {
  const response = await axios.get(
    `${API_URL}/attendance-pattern`,
    getConfig(),
  );
  return response.data;
};
export const getPerformance = async () => {
  const response = await axios.get(`${API_URL}/performance`, getConfig());
  return response.data;
};
