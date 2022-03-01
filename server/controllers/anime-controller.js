const animeService = require('../service/anime-service')

class AnimeController {
    async getAnimeList(req, res, next) {
        try {
            const { page } = req.query
            const animeList = await animeService.getAnime(page)

            return res.json(animeList)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new AnimeController()