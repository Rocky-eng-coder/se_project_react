import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  altButton,
  contentClassName,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content ${contentClassName || ""}`}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="Modal__form">
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__button modal__submit">
              {buttonText}
            </button>
            {altButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
