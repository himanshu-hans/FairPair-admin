import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserEditModel = ({ setUserEditModalOpen, userEditModalOpen }) => {

    return (
        <>
            <Modal
                show={userEditModalOpen}
                onHide={() => setUserEditModalOpen(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="p-4 bg-white shadow-md rounded-lg w-80">
                        <form>
                            <div className="row g-4">
                                <div className="form-group">
                                    <div className="form-group mb-2 d-flex flex-column">
                                        <label htmlFor="username" className="form-label">User Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            //   value={username}
                                            //   onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                    {/* Input Fields Here */}
                                </div>
                            </div>
                              <div className="row g-4">
                                <div className="form-group">
                                    <div className="form-group mb-2 d-flex flex-column">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            //   value={username}
                                            //   onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                    {/* Input Fields Here */}
                                </div>
                            </div>
                              <div className="row g-4">
                                <div className="form-group">
                                    <div className="form-group mb-2 d-flex flex-column">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            //   value={username}
                                            //   onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                    {/* Input Fields Here */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setUserEditModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserEditModel;



