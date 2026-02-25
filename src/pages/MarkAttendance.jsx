import { useState } from "react";
import { markAttendance } from "../services/api";

function MarkAttendance() {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendance(form);
    alert("Attendance Marked!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mark Attendance</h2>
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
