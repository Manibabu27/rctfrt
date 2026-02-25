import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#1f2937", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>Employees</Link>
      <Link to="/add-employee" style={{ marginRight: "15px", color: "white" }}>Add Employee</Link>
      <Link to="/mark-attendance" style={{ color: "white" }}>Mark Attendance</Link>
    </nav>
  );
}

export default Navbar;
