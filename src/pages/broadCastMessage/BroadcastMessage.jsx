import React, { useState, useEffect, useRef } from "react";
import "../broadCastMessage/BroadcastMessage.css";
import { showToast } from "../../components/showToast";
import { get, post } from "../../hooks/services/services";

const BroadcastMessage = () => {
  const dropdownRef = useRef(null);
  
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("");
  const [users, setUsers] = useState([]);
  const [excludeUsers, setExcludeUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await get("user");

      if (response.status === 200 || response.status === 201) {
        setUsers(response.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle broadcast message submission
  const handleSubmit = async () => {
    if (!message || !sendDate || !sendTime) {
      showToast("Please fill all required fields", "warning");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        message,
        sendDate,
        sendTime,
        excludeUsers,
      };

      const response = await post("broadcast/create", payload);
  
      if (response.status === 200 || response.status === 201) {
        showToast("Broadcast message scheduled successfully!", "success");
        setMessage("");
        setSendDate("");
        setSendTime("");
        setExcludeUsers([]);
      }
    } catch (error) {
      console.error("Error creating broadcast:", error.message);
      showToast(error.response?.data?.message || "Error creating broadcast message", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setMessage("");
    setSendDate("");
    setSendTime("");
    setExcludeUsers([]);
    showToast("Broadcast creation cancelled", "info");
  };

  return (
    <div className="broadcast-container">
      <div className="broadcast-card">
        <div className="d-flex justify-content-between align-items-center mb-3 broadCast-heading">
          <h4 className="mb-2">Broadcast Message</h4>
        </div>

        {/* Message Textarea */}
        <div className="mb-4">
          <label className="form-label broadcast-label">Message *</label>
          <textarea
            className="form-control message-box"
            placeholder="Type a message ...."
            rows="6"
            maxLength="1000"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="text-end text-muted small mt-1">
            {message.length}/1000 characters
          </div>
        </div>

        {/* Date and Time Row */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label className="form-label broadcast-label">
              When to send? *
            </label>
            <input
              type="date"
              className="form-control custom-input"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label broadcast-label">Time *</label>
            <input
              type="time"
              className="form-control custom-input"
              value={sendTime}
              onChange={(e) => setSendTime(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label broadcast-label">Do not send to</label>
            <div className="custom-multi-select" ref={dropdownRef}>
              <div
                className="custom-select-control form-select"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {excludeUsers.length > 0
                  ? `${excludeUsers.length} user(s) selected`
                  : "-- Select users to exclude --"}
              </div>
              {isDropdownOpen && (
                <div className="custom-select-dropdown">
                  {users.map((user) => (
                    <div key={user.id} className="custom-select-option">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={excludeUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setExcludeUsers([...excludeUsers, user.id]);
                          } else {
                            setExcludeUsers(
                              excludeUsers.filter((id) => id !== user.id)
                            );
                          }
                        }}
                      />
                      <label htmlFor={`user-${user.id}`}>
                        {user.username || "-"}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <small className="text-muted">
              Selected: {excludeUsers.length} user(s)
            </small>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-auto">
        <button
          className="transparent_btn"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button className="blue_btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Done"}
        </button>
      </div>
    </div>
  );
};

export default BroadcastMessage;