import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Card = ({ id, link, name, likes, owner, onCardClick, onCardLike, onDelete }) => {
    const { _id: userId } = useContext(CurrentUserContext);
    const isOwn = owner === userId;

    const cardDeleteButtonClassName = `card__garbage ${isOwn ? 'card__garbage_active' : 'card__garbage_inactive'}`;

    const isLiked = likes.some((i) => i._id === userId);
    const cardLikeButtonClassName = `card__logo-heart ${
        isLiked ? 'card__logo-heart_style_filled' : 'card__logo-heart_style_unfilled'
    }`;

    return (
        <article className="card">
            <img src={link} alt={name} className="card__img" onClick={() => onCardClick(link, name)} />
            <div className="card__bottom">
                <h2 className="card__place-name">{name}</h2>
                <div className="card__like-column">
                    <button
                        onClick={() => onCardLike(likes, id)}
                        type="button"
                        aria-label="Like"
                        className={cardLikeButtonClassName}></button>
                    <p className="card__like-counter">{likes.length}</p>
                </div>
            </div>
            <button onClick={() => onDelete(id)} type="button" className={cardDeleteButtonClassName}></button>
        </article>
    );
};

export default Card;
