export default class UserInfo {
    constructor({usernameSelector, userinfoSelector}) {
        this._username = document.querySelector(usernameSelector);
        this._userinfo = document.querySelector(userinfoSelector);

    }

    getUserInfo() {
        this._usernameData = this._username.textContent;
        this._userinfoData = this._userinfo.textContent;
        this._userData = {
            username: this._usernameData,
            userinfo: this._userinfoData
        };
        return this._userData
    }

    setUserInfo(data) {
        this._username.textContent = data.username
        this._userinfo.textContent = data.userinfo
    }


}
