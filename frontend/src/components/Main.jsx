import { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header';

const Main = ({ onCardClick, cards, handleCardLike, confirmCardDelete, onHandlePopup }) => {
    const { name, about, avatar } = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile-info">
                <button
                    className="profile-info__avatar-wrapper"
                    onClick={() => onHandlePopup((prev) => ({ ...prev, editAvatarPopupOpen: true }))}>
                    <img src={avatar} alt="Аватар" className="profile-info__img" />
                </button>
                <div className="profile-info__center">
                    <div className="profile-info__row">
                        <h1 className="profile-info__name">{name}</h1>
                        <button
                            type="button"
                            aria-label="Edit"
                            className="profile-info__edit-button"
                            onClick={() => onHandlePopup((prev) => ({ ...prev, editProfilePopupOpen: true }))}></button>
                    </div>
                    <p className="profile-info__about">{about}</p>
                </div>
                <button
                    type="button"
                    aria-label="Add"
                    className="profile-info__add-button"
                    onClick={() => onHandlePopup((prev) => ({ ...prev, addPlacePopupOpen: true }))}></button>
            </section>

            <section className="cards">
                {cards?.map((cardData) => {
                    return (
                        <Card
                            key={cardData._id}
                            id={cardData._id}
                            owner={cardData.owner._id}
                            name={cardData.name}
                            link={cardData.link}
                            likes={cardData.likes}
                            onCardClick={onCardClick}
                            onCardLike={handleCardLike}
                            onDelete={confirmCardDelete}
                        />
                    );
                })}
            </section>
        </main>
    );
};

export default Main;
