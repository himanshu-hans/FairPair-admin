import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { patch } from "../../hooks/services/services";
import { showToast } from "../../components/showToast";

const UserEditModel = ({ 
    setUserEditModalOpen, 
    userEditModalOpen, 
    userToEdit, 
    onClose,
    refreshUserList 
}) => {
    const [userModelData, setUserModelData] = useState({
        username: "",
        year: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userToEdit) {
            setUserModelData({
                username: userToEdit.username || "",
                year: userToEdit.year || "",
            });
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserModelData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userToEdit?.id) {
            showToast("User ID is missing", "error");
            return;
        }

        setLoading(true);
        try {
            const response = await patch(
                `user/updateprofile/${userToEdit.id}`,
                {
                    username: userModelData.username,
                    year: userModelData.year,
                }
            );

            if (response.status === 200 || response.status === 201) {
                showToast(response?.data?.message || response?.message || "User updated successfully!", "success");
                onClose();
            }
        } catch (error) {
            console.error("Error updating user:", error);
            showToast(
                error.response?.data?.message || error.response?.message || error.message || "Error updating user",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setUserEditModalOpen(false);
        setUserModelData({
            username: "",
            year: "",
        });
    };

    return (
        <Modal
            show={userEditModalOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="p-4 bg-white shadow-md rounded-lg w-80">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="form-group">
                                <div className="form-group mb-2 d-flex flex-column">
                                    <label htmlFor="username" className="form-label">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        value={userModelData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row g-4">
                            <div className="form-group">
                                <div className="form-group mb-2 d-flex flex-column">
                                    <label htmlFor="year" className="form-label">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="year"
                                        id="year"
                                        value={userModelData.year}
                                        onChange={handleChange}
                                        placeholder="Enter Year"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center gap-2 mt-3">
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UserEditModel;