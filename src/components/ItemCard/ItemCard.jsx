import "./ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleImageClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Like"
          />
        )}
      </div>

      <img
        onClick={handleImageClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
