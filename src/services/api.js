import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
  // baseURL: "https://fstbck-production.up.railway.app/api"
});

// Employees
export const getEmployees = () =>
  API.get("/employees_details/");

export const createEmployee = (data) =>
  API.post("/employees_details/", data); 

export const deleteEmployee = (employee_id) =>
  API.delete("/employees_details/", {
    params: { employee_id }
  });

// Attendance
export const markAttendance = (data) =>
  API.post("/attendance/", data);

export const getAttendance = (employee_id) =>
  API.get("/attendance/", {
    params: { employee_id }
  });