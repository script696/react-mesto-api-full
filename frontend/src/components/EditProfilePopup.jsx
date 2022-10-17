import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import useInput from '../custumHooks/useInput';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const name = useInput('', { isEmpty: true, minLength: 3 });
    const about = useInput('', { isEmpty: true, minLength: 3 });

    const currentUser = useContext(CurrentUserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateUser({ name: name.val, about: about.val });
    };

    useEffect(() => {
        name.setVal(currentUser.name);
        about.setVal(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormValid={name.isInputValid && about.isInputValid}
            title="Редактировать профиль"
            name="edit-profile"
            buttonText="Сохранить">
            <label className="form__field">
                <input
                    value={name.val || ''}
                    onChange={(e) => name.onChange(e)}
                    onBlur={(e) => name.onBlur(e)}
                    type="text"
                    placeholder="Имя"
                    className="form__text form__text_position_top"
                    name="form__text_type_name"
                    id="name-input"
                />
                {name.errorText.length > 0 && name.isDirty && (
                    <span className="form__text-error">{name.errorText.join('. ')}</span>
                )}
            </label>
            <label className="form__field">
                <input
                    value={about.val || ''}
                    onChange={(e) => about.onChange(e)}
                    onBlur={(e) => about.onBlur(e)}
                    type="text"
                    placeholder="О себе"
                    className="form__text form__text_position_bottom"
                    name="form__text_type_about"
                    id="about-input"
                />
                {about.errorText.length > 0 && name.isDirty && (
                    <span className="form__text-error">{about.errorText.join('. ')}</span>
                )}
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
