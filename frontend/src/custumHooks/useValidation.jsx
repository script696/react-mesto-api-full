import React, { useState, useEffect } from 'react';

const useValidation = (val, validations) => {
    const [isEmpty, setEmpty] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const [errorText, setErrorText] = useState([]);
    const [isInputValid, setIsInputValid] = useState(false);

    const errorLengthTextError = `Длина строки должна быть больше чем ${validations.minLength} символов`;
    const errorEmptyText = 'Поле не должно быть пустым';
    const errorLinkText = 'Введите ссылку';

    const updateArr = (arr, text) => {
        return [...arr.slice(0, arr.indexOf(text)), ...arr.slice(arr.indexOf(text) + 1)];
    };

    useEffect(() => {
        setErrorText((prev) => []);

        for (let key in validations) {
            // eslint-disable-next-line default-case
            switch (key) {
                case 'minLength':
                    if (val.length < validations[key]) {
                        setMinLengthError(true);
                        setErrorText((prev) => [...prev, errorLengthTextError]);
                    } else {
                        setMinLengthError(false);
                        setErrorText((prev) => updateArr(prev, errorLengthTextError));
                    }
                    break;
                case 'isEmpty':
                    if (!val.length) {
                        setEmpty(true);
                        setErrorText((prev) => [...prev, errorEmptyText]);
                    } else {
                        setEmpty(false);
                        setErrorText((prev) => updateArr(prev, errorEmptyText));
                    }
                    break;
                case 'isLink':
                    const re =
                        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
                    if (re.test(String(val).toLowerCase())) {
                        setEmailError(false);
                        setErrorText((prev) => updateArr(prev, errorLinkText));
                    } else {
                        setEmailError(true);
                        setErrorText((prev) => [...prev, errorLinkText]);
                    }
            }
        }
    }, [val]);

    useEffect(() => {
        if (isEmpty || minLengthError || emailError) setIsInputValid(false);
        else setIsInputValid(true);
    }, [isEmpty, minLengthError, emailError]);

    return { isEmpty, minLengthError, errorText, isInputValid };
};

export default useValidation;
