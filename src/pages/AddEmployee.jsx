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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee(form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input placeholder="Employee ID" onChange={e => setForm({...form, employee_id: e.target.value})} /><br/><br/>
      <input placeholder="Full Name" onChange={e => setForm({...form, full_name: e.target.value})} /><br/><br/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /><br/><br/>
      <input placeholder="Department" onChange={e => setForm({...form, department: e.target.value})} /><br/><br/>
      <button type="submit">Save</button>
    </form>
  );
}

export default AddEmployee;
