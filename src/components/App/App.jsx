import { useEffect, useState } from "react";

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
import { loginUser, checkToken, registerUser } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

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

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.warn("You must be logged in to add items.");
    }
    // Create a new item with the correct property name
    const newItemData = {
      name,
      link: imageUrl, // we send it as imageUrl
      weather,
    };

    addItem(newItemData, token)
      .then((newItem) => {
        // If the server returns 'link', convert it to 'imageUrl'
        const standardizedItem = {
          ...newItem,
          imageUrl: newItem.link || newItem.imageUrl,
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
          imageUrl: item.link || item.imageUrl,
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
          console.log("Token is valid. User data:", userData);
        })
        .catch((err) => {
          console.error("Invalid token:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleRegister = (userData) => {
    registerUser(userData)
      .then((res) => {
        console.log("User registered:", res);
        setIsRegisterModalOpen(false);
      })
      .catch((err) => console.error("Registration error:", err));
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log("Login successful");
        } else {
          console.warm("No token returned");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleDeleteItem = (itemToDelete) => {
    if (!itemToDelete || !itemToDelete._id) {
      console.warn("Invalid itemToDelete:", itemToDelete);
      return;
    }

    setClothingItems((prevItems = []) =>
      prevItems.filter((item) => item._id !== itemToDelete._id)
    );
    closeActiveModal();
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  onDelete={handleDeleteItem}
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
                  onDelete={handleDeleteItem}
                />
              }
            />
            <Route
              path="/signin"
              element={<LoginModal onLogin={handleLogin} />}
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
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeActiveModal}
          onRegister={handleRegister}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
