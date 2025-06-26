import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  onRegisterClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    onLogin({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setErrorMessage("Login failed.");
      });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!email || !password}
      contentClassName="modal__content_login"
      altButton={
        <button
          type="button"
          className="modal__button modal__alt-button"
          onClick={onRegisterClick}
        >
          or Sign Up
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}
