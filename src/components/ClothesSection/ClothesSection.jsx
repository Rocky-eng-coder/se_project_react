import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
  };
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              // TODO - Pass as prop
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
