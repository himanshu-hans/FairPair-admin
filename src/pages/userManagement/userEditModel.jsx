import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserEditModel = ({ setUserEditModalOpen, userEditModalOpen,userToEdit }) => {
    const [userModelData, setUserModelData] = React.useState({
        username: "",
        year: "",
    });

const handleChange = (e) => {
    const { name, value } = e.target;
    setUserModelData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
}



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
                                            name="username"
                                            id="username"
                                              value={userToEdit?.username}
                                          onChange={(e) => handleChange(e)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                              <div className="row g-4">
                                <div className="form-group">
                                    <div className="form-group mb-2 d-flex flex-column">
                                        <label htmlFor="username" className="form-label">Year</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="year"
                                            id="username"
                                              value={userToEdit?.year}
                                              onChange={(e) => handleChange(e)}
                                            placeholder="Enter Year"
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



