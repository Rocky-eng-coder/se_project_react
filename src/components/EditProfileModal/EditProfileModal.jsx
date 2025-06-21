import React, { useContext, useEffect, useState } from "react";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content--form">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__title">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          Name*
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="modal__input"
            required
          />
          Avatar*
          <input
            type="url"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="modal__input"
            required
          />
          <button type="submit" className="modal__save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
