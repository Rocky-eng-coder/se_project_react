import avatar from "../../assets/avatar.png";
import "./sidebar.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatar}
        alt="User avatar"
      />
      <p className="sidebar__username">{currentUser?.name || "Guest"}</p>

      <div className="sidebar__buttons">
        <button className="edit-profile-button" onClick={onEditProfile}>
          Edit Profile
        </button>

        <button className="sidebar__signout-button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
