import React from 'react';

/**
 * React - List Component with Conditional Rendering
 * Exercise: Demonstrates list rendering and conditional rendering
 */

function EmployeeList({ employees, onDeleteEmployee }) {
  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <button 
                  onClick={() => onDeleteEmployee(employee.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
