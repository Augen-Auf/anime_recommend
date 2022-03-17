const {Schema, model} = require("mongoose")

const RatingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    anime: { type: Number},
    rating: { type: Number},
})

module.exports = model('Rating', RatingSchema)