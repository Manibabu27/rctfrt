import { useState } from "react";
import { markAttendance } from "../services/api";

function MarkAttendance() {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      await markAttendance(form);
      setMessage("Attendance Marked Successfully!");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Display the specific error message from the backend
        setMessage(err.response.data.detail);
      } 
      else if (err.response && err.response.status === 400) {
        setMessage(err.response.data.detail);
      } 
      else {
        // Handle other potential errors
        setMessage("An error occurred while marking attendance.");
        console.error("Attendance Error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mark Attendance</h2>
      {message && <p style={{ color: message.includes("Successfully") ? "green" : "red" }}>{message}</p>}
      <input placeholder="Employee ID" onChange={e => setForm({...form, employee_id: e.target.value})} /><br/><br/>
      <input type="date" onChange={e => setForm({...form, date: e.target.value})} /><br/><br/>
      <select onChange={e => setForm({...form, status: e.target.value})}>
        <option>Present</option>
        <option>Absent</option>
      </select><br/><br/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MarkAttendance;
