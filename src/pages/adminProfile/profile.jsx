import React, { useState } from "react";
import "./Profile.css";
import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Apurva",
    lastName: "Apurva",
    phone: "+91 4694659458",
    email: "eurj@example.com",
    joinedOn: "22/01/2025",
    lastDate: "Till today",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h4 className="mb-2">Profile</h4>
      <div className="card border-0 rounded-3 p-4">
        <div className="card-body p-0">
          {/* Header */}
          <div className="d-flex align-items-center">
            <img
              src="../images/profile-img.svg"
              alt="Profile"
              className="me-3 profile-img"
            />
            <div>
              <h5 className="mb-0 fw-bold admin-name">Apurv Potdar</h5>
              <small className="text-muted" style={{fontSize:'1.1rem'}}>Admin</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 rounded-3 card-padding">
        <div className="card-body">
          {/* Personal Info Section */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="fw-semibold mb-0 personal-info">
              Personal information
            </h6>
            {!isEditing && (
              <FaPencilAlt
                className="text-secondary cursor-pointer"
                style={{ fontSize: "1.2rem" }}
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>

          {/* Info View/Edit */}
          <div className="mt-3">
            {isEditing ? (
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    className="form-control p-4"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control p-4"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone number</label>
                  <input
                    type="text"
                    className="form-control p-4"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label  fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control p-4"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label  fw-semibold">Joined on</label>
                  <input
                    type="text"
                    className="form-control p-4"
                    name="joinedOn"
                    value={formData.joinedOn}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label  fw-semibold">Last date</label>
                  <input
                    type="text"
                    className="form-control p-4"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="transparent_btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="blue_btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </form>
            ) : (
              <div className="row mt-2">
                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-semibold">First Name</p>
                  <p className="text-muted fw-medium fs-5">
                    {formData.firstName}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-semibold">Last Name</p>
                  <p className="text-muted fw-medium fs-5">
                    {formData.lastName}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-semibold">Phone number</p>
                  <p className="text-muted fw-medium fs-5">{formData.phone}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-semibold">Email</p>
                  <p className="text-muted fw-medium fs-5">{formData.email}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-semibold">Joined on</p>
                  <p className="text-muted fw-medium fs-5">
                    {formData.joinedOn}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted small">Last date</p>
                  <p className="text-muted fw-medium fs-5">
                    {formData.lastDate}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
