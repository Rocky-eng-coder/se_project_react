import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems = [], onCardClick, onAddClick }) {
  return (
    <div className="clothes-section">
      <div className="itemsHeader">
        <p className="yourItems">Your items</p>
        <button className="addButton" onClick={onAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.length > 0 ? (
          clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                // TODO - Pass as prop
              />
            );
          })
        ) : (
          <p>No items available.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
