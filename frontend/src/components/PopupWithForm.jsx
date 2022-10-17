import React from 'react';

const PopupWithForm = ({ title, name, children = null, buttonText, isOpen, onClose, onSubmit, isFormValid }) => {
    return (
        <div className={`popup popup_target_${name} ${isOpen && 'popup_opend'}`}>
            <div className="popup__body">
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} className="form form_target_profile" name={name} noValidate={true}>
                    {children && children}
                    <button
                        disabled={!isFormValid}
                        type="submit"
                        className={`form__button ${!isFormValid ? 'button_inactive' : null}`}>
                        {buttonText}
                    </button>
                </form>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={() => {
                        onClose();
                    }}></button>
            </div>
        </div>
    );
};

export default PopupWithForm;
