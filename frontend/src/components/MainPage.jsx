import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const MainPage = ({ onHandlePopup, onCardClick, cards, handleCardLike, confirmCardDelete, handleClick }) => {
    return (
        <>
            <Header btnText="Выйти" isMainPagePopup={true} handleClick={handleClick} />
            <section className="page">
                <Main
                    onHandlePopup={onHandlePopup}
                    onCardClick={onCardClick}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    confirmCardDelete={confirmCardDelete}
                />
                <Footer />
            </section>
        </>
    );
};

export default MainPage;
