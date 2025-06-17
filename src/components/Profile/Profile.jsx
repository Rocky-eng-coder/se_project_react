import React, { useState, useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onDeleteItem,
  onSignOut,
  onCardLike,
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

  const handleUpdateUser = async ({ name, avatar }) => {
    try {
      const updatedUser = await api.updateUser({ name, avatar });

      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} />
        <button
          onClick={handleEditProfileClick}
          className="edit-profile-button"
        >
          Edit Profile
        </button>
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

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default Profile;
