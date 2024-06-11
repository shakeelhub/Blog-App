import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 6 characters long.';
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  async function register(e) {
    e.preventDefault();
    const errorMessage = validatePassword(password);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    const response = await fetch('http://localhost:4100/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include'
    });

    if (response.status === 200) {
      alert('Registration Successful');
      navigate('/login');
    } else {
      alert('Registration Failed buddy');
    }
  }


 

  return (
    <div className="container">
      <div className="left">
        <div className="login-section">
          <header style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h2 className="animation a1">
              Ready to Inspire? <br />
              <span style={{ color: "#028391", fontSize: '20px' }}>Create Your Account!</span>
            </h2>
          </header>
          <form className='register' style={{ maxWidth: "400px", margin: "0 auto" }} onSubmit={register}>
            <h1  style={{ marginTop: '-13px' }}>Sign Up</h1>
            <input
              type="text"
              placeholder='Username'
              value={username}
              className="input-field animation a2"
              onChange={e => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder='Email'
              value={email}
              className="input-field animation a3"
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder='Password'
              className="input-field animation a4"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
              {error && <p className="error-message">{error}</p>}
            <p className="animation a5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              Already a Member?
              <Link to='/login' style={{ color: '#7E8EF1', paddingLeft: '4px' }}> Login </Link>
            </p>
            <button className="animation a6" style={{ marginTop: '10px' }}>Sign Up</button>
          </form>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default RegisterPage;
