import React from "react";
import "../broadCastMessage/BroadcastMessage.css";

const BroadcastMessage = () => {
  return (
    <div className="broadcast-container">
      <div className="broadcast-card">
        <div className="d-flex justify-content-between align-items-center mb-3 broadCast-heading">
          <h4 className="mb-2">Broadcast Message</h4>
          <a href="#" className="preview-link text-decoration-none">
            <img src="../images/eye.svg" className="img-fluid"></img> Preview
          </a>
        </div>

        {/* Message Textarea */}
        <div className="mb-4">
          <label className="form-label broadcast-label">Message</label>
          <textarea
            className="form-control message-box"
            placeholder="Type a message ...."
            rows="6"
            maxLength="1000"
          ></textarea>
          <div className="text-end text-muted small mt-1">1000 words</div>
        </div>

        {/* Date and Time Row */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label className="form-label broadcast-label">When to send ?</label>
            <input type="date" className="form-control custom-input" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label broadcast-label">Time</label>
            <div className="d-flex align-items-center">
              <input type="time" className="form-control custom-input" />
              <div className="d-flex gap-2 align-items-center ms-2">
                <button className="btn btn-outline-secondary p-3">AM</button>
                <button className="btn btn-outline-secondary p-3">PM</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label broadcast-label">Do not send to</label>
            <select className="form-select custom-input">
              <option value="">User</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </div>
        </div>


      </div>
        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-auto">
          <button className="transparent_btn">Cancel</button>
          <button className="blue_btn">Done</button>
        </div>
    </div>
  );
};

export default BroadcastMessage;
