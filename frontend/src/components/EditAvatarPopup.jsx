import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useInput from '../custumHooks/useInput';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const inputAvatar = useRef();

    const link = useInput('', { isEmpty: true, isLink: true });

    const handleSubmit = (e) => {
        e.preventDefault();

        const avatar = inputAvatar?.current?.value;
        onUpdateAvatar(avatar);
    };

    useEffect(() => {
        link.resetInput();
    }, [isOpen]);

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Обновить аватар"
            name="edit-avatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            isFormValid={link.isInputValid}>
            <label className="form__field">
                <input
                    value={link.val}
                    ref={inputAvatar}
                    onChange={(e) => link.onChange(e)}
                    onBlur={(e) => link.onBlur(e)}
                    type="url"
                    placeholder="Ссылка на аватар"
                    className="form__text form__text_position_bottom"
                    name="form__text_type_about"
                    id="avatar-input"
                />
                {link.errorText.length > 0 && link.isDirty && (
                    <span className="form__text-error">{link.errorText.join('. ')}</span>
                )}
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
