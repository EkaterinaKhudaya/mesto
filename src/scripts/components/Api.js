class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    getInitialCards() {
        return fetch(this._baseUrl + 'cards', {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })

    }

    getUserInfo() {
        return fetch(this._baseUrl + 'users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    editProfile(data) {
        return fetch(this._baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.userinfo
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })

    }

    addNewCard(data) {
        return fetch(this._baseUrl + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.cardDescription,
                link: data.cardImage
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }

    deleteCard(data) {
        return fetch(this._baseUrl + `cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }

    toggleLikeCard(method, data) {
        return fetch(this._baseUrl + `cards/likes/${data.id}`, {
            method: method,
            headers: this._headers,
            body: JSON.stringify({
                likes: data.likes
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }

    changeAvatar(data) {
        return fetch(this._baseUrl + `users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })

    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: 'e8cb2382-0f4e-472e-9e9e-f9ed0f591da8',
        'Content-Type': 'application/json'
    }
});
