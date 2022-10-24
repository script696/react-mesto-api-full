import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { authorize } from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { getContent, register } from '../utils/auth';
import api from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup.jsx';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './MainPage';

const App = () => {
    const history = useHistory();

    const [isPopupOpen, setIsPopupOpen] = useState({
        editProfilePopupOpen: false,
        addPlacePopupOpen: false,
        editAvatarPopupOpen: false,
        imageOpenPopupOpen: false,
        confirmationPopupOpen: false,
        infoTooltipPopupOpen: false
    });

    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = useState({ _id: '', name: '', about: '', avatar: '', cohort: '', email: '' });
    const [cards, setCards] = useState([]);
    const [idCardDeleteConfirmation, setIdCardDeleteConfirmation] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

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
        if (loggedIn) {
            (async () => {
                try {
                    const [userInfoData, initialCardsData] = await Promise.all([
                        api.getUserInfo(),
                        api.getInitialCards()
                    ]);
                    setCurrentUser((prev) => ({ ...prev, ...userInfoData.data }));
                    setCards(() => [...initialCardsData.data]);
                } catch (e) {
                    console.error(e);
                }
            })();
        }

        (async () => {
            const jwt = localStorage.getItem('jwt');
            try {
                if (jwt) {
                    const res = await getContent(jwt);
                    const {
                        data: { email }
                    } = res;
                    setCurrentUser((prev) => ({ ...prev, email: email }));
                    setLoggedIn((prev) => (prev = true));
                    history.push('/');
                } else {
                    return;
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [loggedIn]);

    const handleLoginSubmit = async (e, email, password) => {
        e.preventDefault();

        try {
            const res = await authorize(email, password);
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                setLoggedIn((prev) => (prev = true));
                history.push('/');
            }
        } catch (e) {
            setIsLoginSuccess(false);
            setIsPopupOpen((prev) => ({ ...prev, infoTooltipPopupOpen: true }));
        }
    };

    const handleRegistrarionSubmit = async (e, email, password) => {
        e.preventDefault();

        try {
            const res = await register(email, password);
            setIsLoginSuccess(true);

            setIsPopupOpen((prev) => ({ ...prev, infoTooltipPopupOpen: true }));

            setTimeout(() => {
                history.push('/');
                setIsPopupOpen((prev) => ({ ...prev, infoTooltipPopupOpen: false }));
            }, 800);
        } catch (e) {
            setIsLoginSuccess(false);
            setIsPopupOpen((prev) => ({ ...prev, infoTooltipPopupOpen: true }));
        }
    };

    const handleUpdateUser = async ({ name, about }) => {
        try {
            let res = await api.modifyProfile(name, about);
            setCurrentUser({ ...res.data });
            closeAllPopups();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateAvatar = async (avatar) => {
        try {
            const res = await api.editAvatar(avatar);
            setCurrentUser({ ...res.data });
            closeAllPopups();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCardLike = async (likes, id) => {
        const isLiked = likes.some((i) => {
            console.log(i._id, currentUser._id)

           return (i._id === currentUser._id)
        });
        const apiMethod = isLiked ? 'DELETE' : 'PUT';
        try {
            const res = await api.toggleLike(id, apiMethod);
            setCards((prev) => prev.map((c) => (c._id === id ? res.data : c)));
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

    const redirectToRegistration = () => {
        history.push('/sign-up');
    };
    const redirectToLogin = () => {
        history.push('/sign-in');
    };

    const checkout = () => {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <ProtectedRoute
                    path="/"
                    exact
                    component={MainPage}
                    loggedIn={loggedIn}
                    onHandlePopup={setIsPopupOpen}
                    onCardClick={handleCardClick}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    confirmCardDelete={confirmCardDelete}
                    handleClick={checkout}
                />
                <Route path="/sign-up" exact>
                    <Header btnText="Войти" handleClick={redirectToLogin} />
                    <section className="sign-up-in">
                        <Register
                            authType="Регистрация"
                            btnText="Зарегестрироваться"
                            onSubmit={handleRegistrarionSubmit}></Register>
                    </section>
                </Route>

                <Route path="/sign-in" exact>
                    <Header btnText="Зарегестрироваться" handleClick={redirectToRegistration} />
                    <section className="sign-up-in">
                        <Login
                            authType="Вход"
                            btnText="Войти"
                            setLoggedIn={setLoggedIn}
                            onSubmit={handleLoginSubmit}></Login>
                    </section>
                </Route>
            </Switch>
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
            <InfoTooltip
                onClose={closeAllPopups}
                isOpen={isPopupOpen.infoTooltipPopupOpen}
                isSuccess={isLoginSuccess}
            />
        </CurrentUserContext.Provider>
    );
};

export default App;
