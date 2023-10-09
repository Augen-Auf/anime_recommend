module.exports = class RatingDto {
    user_id;
    anime;
    rating;

    constructor(model) {
        this.anime = model.anime
        this.user_id = model.user_id
        this.rating = model.rating
    }
}
