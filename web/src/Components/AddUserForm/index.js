import React, { useState } from 'react';
import Modal from '../Modal';

const AddUserForm = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}/>
    </div>
  );
};

export default AddUserForm;
