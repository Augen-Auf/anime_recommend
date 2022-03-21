module.exports = class RatingDto {
    user;
    anime;
    rating;

    constructor(model) {
        this.anime = model.anime
        this.user = model.user
        this.rating = model.rating
    }
}