import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceRecords from "./pages/AttendanceRecords";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/attendance/:id" element={<AttendanceRecords />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
