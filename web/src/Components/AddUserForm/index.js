import React, { useState } from 'react';
import Modal from '../Modal';

const AddUserForm = ({ handleModalClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    handleModalClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default AddUserForm;
