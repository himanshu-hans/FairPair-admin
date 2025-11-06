import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/showToast';
import { post } from '../../hooks/services/services';
import { loginSuccess } from '../../components/authRedux/authSlice';

const Login = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        useremail,
        password,
      };

      const response = await post("auth/login", payload);

      if (response.status === 200 || response.status === 201 || response.status === 201) {
        const getData = response.data;

        const authToken = getData?.data?.access_token || getData?.access_token;
        const userId = getData?.data?.userId || getData?.userId;
        const refreshToken = getData?.data?.refresh_token || getData?.refresh_token;

        if (authToken) {
          // Dispatch to Redux store
          dispatch(loginSuccess({
            access_token: authToken,
            refresh_token: refreshToken || null,
            userId: userId,
            userEmail: useremail,
            rememberMe: rememberMe,
          }));

          // Optional:- Keep localStorage for remember me feature
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("savedEmail", useremail);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("savedEmail");
          }

          showToast("Login successful!", "success");
          navigate("/user-management");
        } else {
          showToast("Login failed. No token received.", "error");
        }
      } else {
        showToast(response.data?.message || "Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast(error.response?.data?.message || error.message || "An error occurred during login", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src='../images/logo.svg' alt='logo' />
      </div>
      <div className="login-wrapper">
        <div className="login-header text-center mb-4">
          <h2 className="login-title mt-3">Login</h2>
          <p className="login-subtitle">Enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group mb-2">
            <label htmlFor="useremail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="useremail"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-btn w-100 mb-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-options d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
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