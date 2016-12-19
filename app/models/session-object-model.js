
class SessionObject {

    constructor (user, user_type, is_active) {
        this.user = user;
        this.user_type = user_type;
        this.is_active = true;
    }

    getUser() {
        return this.user;
    }

    getUserType() {
        return this.user_type;
    }

    isActive() {
        return this.is_active;
    }

}

module.exports = SessionObject;