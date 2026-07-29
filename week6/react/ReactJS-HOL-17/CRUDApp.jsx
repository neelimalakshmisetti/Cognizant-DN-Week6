import React, { useState } from 'react';

// HOL-17: Full CRUD Application
// Exercise: Build a complete Employee Management CRUD app with React

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Alice Johnson',  role: 'Developer',  dept: 'Engineering', salary: 85000 },
  { id: 2, name: 'Bob Smith',      role: 'Designer',   dept: 'UX',          salary: 75000 },
  { id: 3, name: 'Carol Williams', role: 'Manager',    dept: 'HR',          salary: 90000 },
];

const EMPTY_FORM = { name: '', role: '', dept: '', salary: '' };

function EmployeeCRUD() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editing, setEditing]     = useState(null);
  const [search, setSearch]       = useState('');
  const [nextId, setNextId]       = useState(4);

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = ({ target: { name, value } }) =>
    setForm(f => ({ ...f, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.dept) return;
    if (editing !== null) {
      setEmployees(emp => emp.map(e => e.id === editing ? { ...e, ...form, salary: +form.salary } : e));
      setEditing(null);
    } else {
      setEmployees(emp => [...emp, { id: nextId, ...form, salary: +form.salary }]);
      setNextId(n => n + 1);
    }
    setForm(EMPTY_FORM);
  };

  const handleEdit = (emp) => {
    setEditing(emp.id);
    setForm({ name: emp.name, role: emp.role, dept: emp.dept, salary: emp.salary });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this employee?'))
      setEmployees(emp => emp.filter(e => e.id !== id));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      <h1>Employee Management System</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
        <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
        {['name','role','dept','salary'].map(f => (
          <input key={f} name={f} value={form[f]} onChange={handleChange}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            type={f === 'salary' ? 'number' : 'text'} required={f !== 'salary'} />
        ))}
        <button type="submit">{editing ? 'Update' : 'Add'} Employee</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm(EMPTY_FORM); }}>Cancel</button>}
      </form>

      {/* Search */}
      <input placeholder="Search by name or department..." value={search}
        onChange={e => setSearch(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />

      {/* Table */}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>{['ID','Name','Role','Department','Salary','Actions'].map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {filtered.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.dept}</td>
              <td>${emp.salary.toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>✏️ Edit</button>{' '}
                <button onClick={() => handleDelete(emp.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No employees found.</td></tr>}
        </tbody>
      </table>
      <p><strong>Total: {filtered.length} employee(s)</strong></p>
    </div>
  );
}

export default EmployeeCRUD;
