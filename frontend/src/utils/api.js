class Api {
    constructor({ id, headers }) {
        this._id = id;
        this._headers = headers;
    }
    _getToken(){
     return localStorage.getItem('jwt')
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._id}/users/me`, {
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`}
        }).then((res) => this._getResponseData(res));
    }

    getInitialCards() {
        return fetch(`${this._id}/cards`, {
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`}
        }).then((res) => this._getResponseData(res));
    }

    modifyProfile(name, about) {
        return fetch(`${this._id}/users/me`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`},
            body: JSON.stringify({
                name,
                about
            })
        }).then((res) => this._getResponseData(res));
    }

    addNewCard(name, link) {
        return fetch(`${this._id}/cards`, {
            method: 'POST',
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`},
            body: JSON.stringify({
                name,
                link
            })
        }).then((res) => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._id}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`}
        }).then((res) => this._getResponseData(res));
    }

    toggleLike(cardId, method) {
        return fetch(`${this._id}/cards/${cardId}/likes`, {
            method: method,
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`}
        }).then((res) => this._getResponseData(res));
    }

    editAvatar(avatar) {
        return fetch(`${this._id}/users/me/avatar`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${this._getToken()}`},
            body: JSON.stringify({
                avatar
            })
        }).then((res) => this._getResponseData(res));
    }
}

const api = new Api({
    id: 'https://api.script696.students.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
