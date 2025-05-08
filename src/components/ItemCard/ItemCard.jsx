import "./ItemCard.css";

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
    </li>
  );
}

export default ItemCard;
