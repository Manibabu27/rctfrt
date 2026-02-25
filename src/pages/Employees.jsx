import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee, getAttendance } from "../services/api";
import { useNavigate } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [presentCounts, setPresentCounts] = useState({});
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);

      // Fetch present count for each employee
      res.data.forEach(async (emp) => {
        try {
          const attendanceRes = await getAttendance(emp.employee_id);

          const presentCount = attendanceRes.data.filter(
            (record) =>
              record.status &&
              record.status.toLowerCase() === "present"
          ).length;

          setPresentCounts((prev) => ({
            ...prev,
            [emp.employee_id]: presentCount,
          }));
        } catch (err) {
          console.error("Failed to fetch attendance");
        }
      });

    } catch (err) {
      alert("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (employee_id) => {
    try {
      await deleteEmployee(employee_id);
      fetchEmployees();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      <button onClick={() => navigate("/add-employee")}>
        Add Employee
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Present Days</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>

              {/* Separate Present Count Column */}
              <td style={{ fontWeight: "bold", textAlign: "center" }}>
                {presentCounts[emp.employee_id] ?? 0}
              </td>

              {/* Attendance Button */}
              <td>
                <button
                  onClick={() =>
                    navigate(`/attendance/${emp.employee_id}`)
                  }
                >
                  View Attendance
                </button>
              </td>

              {/* Delete  Employee*/}
              <td>
                <button
                  onClick={() =>
                    handleDelete(emp.employee_id)
                  }
                >
                  Delete Employee
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;