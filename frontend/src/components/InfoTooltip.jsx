import React from 'react';

const InfoTooltip = ({ onClose, isSuccess, isOpen }) => {
    const titleText = isSuccess ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! попробуйте еще раз.';
    const popupClasses = ['popup', 'popup_target_info-tooltip', isOpen && 'popup_opend'];
    const popupLabelClasses = ['popup__label', isSuccess ? 'popup__label_success' : 'popup__label_decline'];

    return (
        <div className={popupClasses.join(' ')}>
            <div className="popup__body">
                <div className={popupLabelClasses.join(' ')}></div>
                <h2 className="popup__title popup__title_tooltip">{titleText}</h2>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={() => {
                        onClose();
                    }}
                />
            </div>
        </div>
    );
};

export default InfoTooltip;
