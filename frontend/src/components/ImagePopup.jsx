import React from 'react';

const ImagePopup = ({ card, onClose, isOpen }) => {
    return (
        <div className={`popup popup_target_card-fullscreen ${isOpen && 'popup_opend'}`}>
            <div className="popup__body popup__body_target_card-fullscreen">
                <figure className="popup__figure figure">
                    <img src={card.link && card.link} alt={card.name && card.name} className="figure__img" />
                    <figcaption className="figure__name"></figcaption>
                </figure>
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

export default ImagePopup;
