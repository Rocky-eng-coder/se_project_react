import "./ItemModal.css";
import React, { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(card);
    setShowConfirm(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const isOwn = currentUser && card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content--image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close--item"
        ></button>
        <img
          src={card.imageUrl}
          alt="Clothing piece"
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isOwn && (
            <button
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="modal modal_type_confirm modal_opened">
          <div className="modal__content modal__content--delete">
            <button
              onClick={handleCancelDelete}
              type="button"
              className="modal__close modal__close--item"
            ></button>
            <p className="modal__item--close">
              Are you sure you want to delete this item? This action is
              irreversible.
            </p>
            <button
              className="modal__cancel-button modal__cancel-button--delete"
              onClick={handleConfirmDelete}
            >
              Yes, delete item
            </button>
            <button
              className="modal__cancel-button"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemModal;
