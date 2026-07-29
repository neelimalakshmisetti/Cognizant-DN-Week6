import React from 'react';

// HOL-2: Components and Props
// Exercise: Build reusable components and pass data using props

function UserCard({ name, role, department, email }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div className="user-list">
      <h1>Employee Directory</h1>
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </div>
  );
}

function App() {
  const users = [
    { name: "Alice Johnson", role: "Developer", department: "Engineering", email: "alice@company.com" },
    { name: "Bob Smith",    role: "Designer",   department: "UX",          email: "bob@company.com"   },
    { name: "Carol White",  role: "Manager",    department: "HR",          email: "carol@company.com" },
  ];

  return <UserList users={users} />;
}

export default App;
