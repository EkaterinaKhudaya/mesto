export default class UserInfo {
    constructor({usernameSelector, userinfoSelector, userinfoAvatar}) {
        this._name = document.querySelector(usernameSelector);
        this._about = document.querySelector(userinfoSelector);
        this._avatar = document.querySelector(userinfoAvatar)

    }

    getUserInfo() {
        this._userData = {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        };
        return this._userData
    }

     setUserInfo(data) {
        this._name.textContent = data.name
        this._about.textContent = data.about
        this._avatar.src = data.avatar
    }
}
