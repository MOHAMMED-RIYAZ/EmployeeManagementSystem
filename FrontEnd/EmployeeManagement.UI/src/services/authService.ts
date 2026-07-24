import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

interface LoginRequest {
  username: string;
  password: string;
}

interface JwtPayload {
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post("/Auth/login", data);
  return response.data;
};

export const getRole = (): string => {
  const token = localStorage.getItem("token");

  if (!token) return "";

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return (
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      ""
    );
  } catch {
    return "";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const register = async (user: any) => {
  const response = await api.post("/Auth/register", user);
  return response.data;
};
