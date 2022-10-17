import { useEffect, useState } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup.jsx';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';

const App = () => {
    const [isPopupOpen, setIsPopupOpen] = useState({
        editProfilePopupOpen: false,
        addPlacePopupOpen: false,
        editAvatarPopupOpen: false,
        imageOpenPopupOpen: false,
        confirmationPopupOpen: false
    });

    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = useState({ _id: '', name: '', about: '', avatar: '', cohort: '' });
    const [cards, setCards] = useState(null);
    const [idCardDeleteConfirmation, setIdCardDeleteConfirmation] = useState('');

    const closeAllPopups = () => {
        setSelectedCard({ name: '', link: '' });
        for (let key in isPopupOpen) isPopupOpen[key] = false;
    };

    const handleCardClick = (link, name) => {
        setSelectedCard(() => ({
            link: link,
            name: name
        }));
        setIsPopupOpen((prev) => ({ ...prev, imageOpenPopupOpen: true }));
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [userInfoData, initialCardsData] = await Promise.all([api.getUserInfo(), api.getInitialCards()]);
                setCurrentUser(() => ({ ...userInfoData }));
                setCards(() => [...initialCardsData]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInitialData();
    }, []);

    const handleUpdateUser = async ({ name, about }) => {
        try {
            let res = await api.modifyProfile(name, about);
            setCurrentUser({ ...res });
            closeAllPopups();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateAvatar = async (avatar) => {
        try {
            const res = await api.editAvatar(avatar);
            setCurrentUser({ ...res });
            closeAllPopups();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCardLike = async (likes, id) => {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        const apiMethod = isLiked ? 'DELETE' : 'PUT';
        try {
            const res = await api.toggleLike(id, apiMethod);
            setCards((prev) => prev.map((c) => (c._id === id ? res : c)));
        } catch (err) {
            console.error(err);
        }
    };

    const handleCardDelete = async () => {
        try {
            const res = await api.deleteCard(idCardDeleteConfirmation);
            setCards((prev) => [...prev].filter((c) => c._id !== idCardDeleteConfirmation));
            closeAllPopups();
            setIdCardDeleteConfirmation((prev) => (prev = ''));
        } catch (err) {
            console.error(err);
        }
    };

    const confirmCardDelete = async (id) => {
        setIsPopupOpen((prev) => ({ ...prev, confirmationPopupOpen: true }));

        setIdCardDeleteConfirmation((prev) => (prev = id));
    };

    const handleAddPlace = async ({ name, link, setName, setLink }) => {
        try {
            const res = await api.addNewCard(name, link);
            setCards((prev) => [res, ...prev]);
            closeAllPopups();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <section className="page">
                <Header />
                <Main
                    onHandlePopup={setIsPopupOpen}
                    onCardClick={handleCardClick}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    confirmCardDelete={confirmCardDelete}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isPopupOpen.editProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isPopupOpen.editAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isPopupOpen.addPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddNewCard={handleAddPlace}
                />

                <ImagePopup card={selectedCard} isOpen={isPopupOpen.imageOpenPopupOpen} onClose={closeAllPopups} />
                <ConfirmationPopup
                    isOpen={isPopupOpen.confirmationPopupOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                />
            </section>
        </CurrentUserContext.Provider>
    );
};

export default App;
