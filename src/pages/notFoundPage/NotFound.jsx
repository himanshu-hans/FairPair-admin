import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
      <h1 className="display-1 fw-bold text-danger mb-3">404</h1>
      <h2 className="h3 fw-semibold mb-2">Page Not Found</h2>
      <p className="text-muted mb-4">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary px-4 py-2">
        Go to Login 
      </Link>
    </div>
  );
};

export default NotFound;
