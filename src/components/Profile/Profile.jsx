import React, { useState, useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onDeleteItem,
  onSignOut,
  onCardLike,
  onEditProfile,
  api,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={handleAddClick}
          onDelete={onDeleteItem}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
