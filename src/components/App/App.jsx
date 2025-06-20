import { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems } from "../../utils/api";
import { addItem } from "../../utils/api";
import { deleteItem } from "../../utils/api";
import { loginUser, checkToken, registerUser } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/auth";
import { addCardLike, removeCardLike } from "../../utils/api";
import ItemCard from "../ItemCard/ItemCard";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsEditProfileModalOpen(false);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.warn("You must be logged in to add items.");
    }
    // Create a new item with the correct property name
    const newItemData = {
      name,
      imageUrl: imageUrl, // we send it as imageUrl
      weather,
    };

    console.log("submitting item:", { name, link: imageUrl, weather });
    addItem(newItemData, token)
      .then((newItem) => {
        const item = newItem.data ?? newItem;
        // If the server returns 'link', convert it to 'imageUrl'
        const standardizedItem = {
          ...item,
          imageUrl: item.imageUrl,
        };
        setClothingItems((prevItems) => [standardizedItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const normalizedData = data.map((item) => ({
          ...item,
          imageUrl: item.imageUrl,
        }));

        setClothingItems(normalizedData);
        // set the clothing items
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          console.log("Token is valid. User:", userData);
        })
        .catch((err) => {
          console.error("Invalid token:", err);
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleRegister = (userData) => {
    registerUser(userData)
      .then((res) => {
        console.log("User registered:", res);
        return loginUser({
          email: userData.email,
          password: userData.password,
        });
      })
      .then((loginRes) => {
        if (loginRes.token) {
          localStorage.setItem("jwt", loginRes.token);
          console.log("Auto-login successful after resignation");
          setIsRegisterModalOpen(false);
        } else {
          console.warn("No token returned after registration login");
        }
      })
      .catch((err) => console.error("Registration/login error:", err));
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log("Login successful");
          setIsLoggedIn(true);
          return checkToken(res.token);
        } else {
          console.warn("No token returned");
          return Promise.reject("No token");
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoginModalOpen(false);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleDeleteItem = (itemToDelete) => {
    const token = localStorage.getItem("jwt");

    if (!itemToDelete || !itemToDelete._id) {
      console.warn("Invalid itemToDelete:", itemToDelete);
      return;
    }

    if (!token) {
      console.warn("You must be logged in to delete items.");
      return;
    }

    deleteItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileModalOpen(false);
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((user) => user === currentUser._id);

    const likeorDislike = isLiked ? removeCardLike : addCardLike;

    likeorDislike(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setIsLoginModalOpen(true)}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onDeleteItem={handleDeleteItem}
                    onEditProfile={() => setIsEditProfileModalOpen(true)}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onLoginClick={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
