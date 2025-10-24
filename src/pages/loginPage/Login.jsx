import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate('/user-management')
    console.log('Login submitted:', { username, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="logo">
          <img src='../images/logo.svg' alt='logo'></img>
        </div>
      <div className="login-wrapper">
        <div className="login-header text-center mb-4">
          {/* <h1 className="logo">
            <span className="logo-fair">FAIR</span>
            <span className="logo-pair">PAIR</span>
            <span className="logo-dot">.</span>
          </h1> */}
          <h2 className="login-title mt-3">Login</h2>
          <p className="login-subtitle">Enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group mb-2">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn w-100 mb-2">
            Login
          </button>

          <div className="login-options d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#" className="forgot-password">Forgot password ?</a>
          </div>
        </form>
      </div>
      
        <div className="login-footer text-center mt-4">
          <p className="copyright">© 2025 FairPair Pvt Ltd</p>
        </div>
    </div>
  );
};

export default Login;