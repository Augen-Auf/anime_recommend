module.exports = class AnimeDto {
    id;
    viewed;
    saved;
    user;

    constructor(model) {
        this.viewed = model.viewed
        this.id = model._id
        this.saved = model.saved
        this.user = model.user
    }
}