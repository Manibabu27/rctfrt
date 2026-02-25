import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendance } from "../services/api";

function AttendanceRecords() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAttendance(id);
      setRecords(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Attendance Records</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={index}>
              <td>{rec.date}</td>
              <td>{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceRecords;
