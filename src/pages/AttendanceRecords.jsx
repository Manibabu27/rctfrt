import { useEffect, useState } from "react";
import { getAttendance } from "../services/api";
import { useParams } from "react-router-dom";

function AttendanceRecords() {
  const { id } = useParams(); // employee_id
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance(id);
      setAttendance(res.data);
    } catch (err) {
      alert("Failed to fetch attendance");
    }
  };

  // Filter logic
  const filteredAttendance = selectedDate
  ? attendance.filter(
      (record) =>
        record.date.slice(0, 10) === selectedDate
    )
  : attendance;

  return (
    <div>
      <h2>Attendance Records</h2>

      <label>Select Date To Filtre: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length > 0 ? (
            filteredAttendance.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceRecords;