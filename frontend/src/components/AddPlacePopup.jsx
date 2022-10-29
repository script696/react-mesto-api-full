import PopupWithForm from './PopupWithForm';
import useInput from '../custumHooks/useInput';
import { useEffect } from 'react';

const AddPlacePopup = ({ isOpen, onClose, onAddNewCard }) => {
    const name = useInput('', { isEmpty: true, minLength: 2 });
    const link = useInput('', { isEmpty: true, isLink: true });

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddNewCard({ name: name.val, link: link.val });
    };

    useEffect(() => {
        name.resetInput();
        link.resetInput();
    }, [isOpen]);

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Новое место"
            name="add-card"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            isFormValid={name.isInputValid && link.isInputValid}>
            <label className="form__field">
                <input
                    value={name.val}
                    onChange={(e) => name.onChange(e)}
                    onBlur={(e) => name.onBlur(e)}
                    type="text"
                    placeholder="Название"
                    className="form__text form__text_position_top"
                    name="form__text_type_name"
                    id="place-name-input"
                />
                {name.errorText.length > 0 && name.isDirty && (
                    <span className="form__text-error">{name.errorText.join('. ')}</span>
                )}
            </label>
            <label className="form__field">
                <input
                    value={link.val}
                    onChange={(e) => link.onChange(e)}
                    onBlur={(e) => link.onBlur(e)}
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="form__text form__text_position_bottom"
                    name="form__text_type_about"
                    id="link-input"
                />
                {link.errorText.length > 0 && link.isDirty && (
                    <span className="form__text-error">{link.errorText.join('. ')}</span>
                )}
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
