import "./ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  const isOwner = item.owner === currentUser?._id;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />

      <div className="card__actions">
        {currentUser && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
          >
            {isLiked ? "" : ""}
          </button>
        )}

        {isOwner && (
          <button
            className="card__delete-button"
            onClick={handleDeleteClick}
            aria-label="Delete"
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
