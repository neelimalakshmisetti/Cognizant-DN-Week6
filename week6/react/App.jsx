import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

/**
 * React - Main App Component
 * Exercise: Demonstrates React functional components with hooks
 */

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'HR' }
  ]);

  const addEmployee = (employee) => {
    const newEmployee = {
      id: employees.length + 1,
      ...employee
    };
    setEmployees([...employees, newEmployee]);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <EmployeeForm onAddEmployee={addEmployee} />
      <EmployeeList 
        employees={employees} 
        onDeleteEmployee={deleteEmployee} 
      />
    </div>
  );
}

export default App;
