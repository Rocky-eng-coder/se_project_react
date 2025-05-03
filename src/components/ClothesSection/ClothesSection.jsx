import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="itemsHeader">
        <p className="yourItems">Your items</p>
        <button className="addButton">+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              // TODO - Pass as prop
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
