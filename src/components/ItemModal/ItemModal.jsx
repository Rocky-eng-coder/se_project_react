import "./ItemModal.css";
import react, { useState } from "react";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

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

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt="Clothing piece"
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          <button className="delete-btn__modal" onClick={handleDeleteClick}>
            Delete item
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="modal modal_type_confirm modal_opened">
          <div className="modal__content modal__content-delete">
            <button
              onClick={handleCancelDelete}
              type="button"
              className="modal__close"
            ></button>
            <p className="delete-item-modal">
              Are you sure you want to delete this item? This action is
              irreversible.
            </p>
            <button
              className="modal__cancel-button modal__cancel-button-delete"
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
