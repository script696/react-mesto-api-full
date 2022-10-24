import useInput from 'custumHooks/useInput';
import { useHistory } from 'react-router-dom';

const Register = ({ authType, btnText, onSubmit }) => {
    const email = useInput('', { isEmpty: true, minLength: 3 });
    const password = useInput('', { isEmpty: true, minLength: 3 });
    const history = useHistory();

    return (
        <div className="login">
            <h2 className="login__title">{authType}</h2>
            <form onSubmit={(e) => onSubmit(e, email.val, password.val)} className="form form_target_login">
                <label className="form__field">
                    <input
                        value={email.val || ''}
                        onChange={(e) => email.onChange(e)}
                        onBlur={(e) => email.onBlur(e)}
                        type="email"
                        placeholder="Email"
                        className="form__text form__text_type_authentication "
                        name="form__text_type_name"
                        id="email-login-input"
                    />
                </label>
                <label className="form__field">
                    <input
                        value={password.val || ''}
                        onChange={(e) => password.onChange(e)}
                        onBlur={(e) => password.onBlur(e)}
                        type="password"
                        placeholder="Пароль"
                        className="form__text form__text_type_authentication "
                        name="form__text_type_about"
                        id="password-login-input"
                    />
                </label>
                <button type="submit" className="login__submit-btn">
                    {btnText}
                </button>
                <div className="sign-up-in__extra-container">
                    <p>Уже зарегестрированы ?</p>
                    <button onClick={() => history.push('/sign-in')} type="button">
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
