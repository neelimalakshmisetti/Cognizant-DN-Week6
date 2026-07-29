import React, { useState } from 'react';

// HOL-9: Forms and Controlled Components
// Exercise: Build a registration form with validation

const INITIAL = { name: '', email: '', password: '', confirmPassword: '', role: 'developer' };

function RegistrationForm() {
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email))           e.email = 'Valid email required';
    if (form.password.length < 6)                   e.password = 'Min 6 characters';
    if (form.password !== form.confirmPassword)     e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleChange = ({ target: { name, value } }) =>
    setForm(f => ({ ...f, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) return <p>✅ Registration successful for <strong>{form.name}</strong>!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration Form</h1>
      {['name','email','password','confirmPassword'].map(field => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field.includes('assword') ? 'password' : field === 'email' ? 'email' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
          {errors[field] && <span style={{ color: 'red' }}>{errors[field]}</span>}
        </div>
      ))}
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
