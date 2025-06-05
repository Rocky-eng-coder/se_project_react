import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onDeleteItem,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={handleAddClick}
          onDelete={onDeleteItem}
        />
      </section>
    </div>
  );
}

export default Profile;
