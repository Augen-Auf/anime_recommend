module.exports = class AnimeDto {
    viewed;
    saved;
    user_id;

    constructor(model) {
        this.viewed = model.viewed
        this.saved = model.saved
        this.user_id = model.user_id
    }
}
