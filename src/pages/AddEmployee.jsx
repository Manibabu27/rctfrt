import { useState } from "react";
import { createEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      await createEmployee(form);
      setMessage("Employee Added Successfully!");
      // navigate("/");
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
        setMessage("An error occurred while adding employee.");
        console.error("Employee Error:", err);
      }
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      {message && <p style={{ color: message.includes("Successfully") ? "green" : "red" }}>{message}</p>}
      <input placeholder="Employee ID" onChange={e => setForm({...form, employee_id: e.target.value})} /><br/><br/>
      <input placeholder="Full Name" onChange={e => setForm({...form, full_name: e.target.value})} /><br/><br/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /><br/><br/>
      <input placeholder="Department" onChange={e => setForm({...form, department: e.target.value})} /><br/><br/>
      <button type="submit">Save</button>
    </form>
  );
}

export default AddEmployee;
