import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const firstLetter = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="What to Wear Logo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{firstLetter}</div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-links">
          <Link to="signin" className="header__link">
            sign In
          </Link>
          <Link to="/signup" className="header__link">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
