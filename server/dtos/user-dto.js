module.exports = class UserDto {
    email;
    id;
    username;
    avatar;

    constructor(model) {
        this.email = model.email
        this.id = model.id
        this.username = model.username
        this.avatar = model.avatar
    }
}
