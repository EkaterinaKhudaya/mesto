export default class UserInfo {
    constructor({usernameSelector, userinfoSelector}) {
        this._username = document.querySelector(usernameSelector);
        this._userinfo = document.querySelector(userinfoSelector);

    }

    getUserInfo() {
        this._userData = {
            username: this._username.textContent,
            userinfo: this._userinfo.textContent
        };
        return this._userData
    }

    setUserInfo(data) {
        this._username.textContent = data.username
        this._userinfo.textContent = data.userinfo
    }
}
