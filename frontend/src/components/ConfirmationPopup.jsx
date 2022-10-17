import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = ({ isOpen, onClose, onDeleteCard }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onDeleteCard();
    };

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Вы уверены?"
            name="remove-confirmation"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            isFormValid={true}
        />
    );
};

export default ConfirmationPopup;
