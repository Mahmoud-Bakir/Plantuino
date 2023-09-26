import React from "react";
import "./style.css";
import close from "../../assets/pictures/close.svg";

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalHeader">
          <span className="modalTitle">Add User</span>
          <div className="closeIcon">
            <img src={close} alt="Logo" onClick={closeModal}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
