import logo from '../img/logo/logo.svg';
import { useContext } from 'react';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

const Header = ({ btnText, isMainPagePopup = false, handleClick }) => {
    const { email } = useContext(CurrentUserContext);

    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__right-col">
                <p className="header__email">{isMainPagePopup ? email && email : null}</p>
                <button onClick={handleClick} className="header__enter-btn" type="button">
                    {btnText}
                </button>
            </div>
        </header>
    );
};

export default Header;
