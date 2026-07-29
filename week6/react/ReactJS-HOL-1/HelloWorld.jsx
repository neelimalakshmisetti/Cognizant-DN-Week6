import React from 'react';

// HOL-1: Introduction to React & JSX
// Exercise: Create a simple React component that renders a greeting message

function HelloWorld() {
  const name = "Cognizant Learner";
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="hello-container">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React! Today is {currentDate}.</p>
      <p>This is your first React component using JSX.</p>
    </div>
  );
}

export default HelloWorld;
