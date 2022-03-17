module.exports = class RatingDto {
    user;
    animeId;
    rating;

    constructor(model) {
        this.animeId = model.animeId
        this.user = model.user
        this.rating = model.rating
    }
}