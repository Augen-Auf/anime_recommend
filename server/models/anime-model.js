const {Schema, model} = require("mongoose")

const AnimeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    viewed: { type: [Number]},
    saved: { type: [Number]},
})

module.exports = model('Anime', AnimeSchema)