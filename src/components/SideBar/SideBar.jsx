import avatar from "../../assets/avatar.png";
import "./sidebar.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./sidebar.css";

function SideBar({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatar}
        alt="User avatar"
      />
      <p className="sidebar__username">{currentUser?.name || "Guest"}</p>

      <button className="sidebar__signout-button" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
