import React, { useState } from 'react';

function SignUp() {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // For demo purposes, we just console.log the values
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // In a real app, you might send a request to your backend server here:
    // fetch('/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) })

    // Clear form fields after submission (optional)
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

// Basic inline styles as an example
const styles = {
  container: {
    width: '400px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    padding: '2rem',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SignUp;