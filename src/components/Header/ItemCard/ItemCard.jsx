import "../ItemCard.ItemCard";

function ItemCard({ item, onCardClick, onDelete }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(item._id);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button onClick={handleDeleteClick} className="card__delete-button">
        Delete
      </button>
    </li>
  );
}

export default ItemCard;
