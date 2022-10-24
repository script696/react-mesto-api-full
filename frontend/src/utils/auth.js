export const BASE_URL = 'https://api.script696.students.nomoredomains.icu';

const checkRes = async (res) => {
    if (!res.ok) {
        const err = await res.json();
        return Promise.reject(`Ошибка: ${err.message}`);
    }
    return res.json();
};

export const register = async (email, password) => {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });
    const resParsed = await checkRes(res);
    return resParsed;
};

export const authorize = async (email, password) => {
    const res = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });

    const resParsed = await checkRes(res);
    return resParsed;
};

export const getContent = async (token) => {
    const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const resParsed = await checkRes(res);
    return resParsed;
};
