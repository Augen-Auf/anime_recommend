const animeService = require('../service/anime-service')

class AnimeController {
    async getAnimeList(req, res, next) {
        try {
            let { page, query, order } = req.body
            const animeList = await animeService.getAnime(page, query, order)
            return res.json(animeList)
        } catch (e) {
            next(e)
        }
    }

    async searchAnime(req, res, next) {
        try {
            const { query } = req.query
            const searchAnimeList = await animeService.searchAnime(query)
            return res.json(searchAnimeList)
        } catch (e) {

        }
    }

    async getUserAnimeList(req, res, next) {
        try {
            console.log(req.body)
            const { userId } = req.body
            const userAnimeList = await animeService.getUserAnimeList(userId)

            return res.json(userAnimeList)
        } catch (e) {
            next(e)
        }
    }

    async getUserAnimeListItems(req, res, next) {
        try {
            const { userId, list } = req.body
            const userAnimeListItems = await animeService.getUserAnimeListItems(userId, list)

            return res.json(userAnimeListItems)
        } catch (e) {
            next(e)
        }
    }

    async setAnimeToList(req, res, next) {
        try {
            const { userId, animeId, list } = req.body
            const userAnimeList = await animeService.setUserAnimeList(userId, animeId, list)

            return res.json(userAnimeList)
        } catch (e) {
            next(e)
        }
    }

    async setAnimeRating(req, res, next) {
        try {
            const { userId, animeId, rating } = req.body
            const userAnimeRatings = await animeService.setAnimeRating(userId, animeId, rating)
            return res.json(userAnimeRatings)
        } catch (e) {
            next(e)
        }
    }

    async getAnimeRatings(req, res, next) {
        try {
            const { userId } = req.body
            const userAnimeRatings = await animeService.getAnimeRatings(userId)
            return res.json(userAnimeRatings)
        } catch (e) {
            next(e)
        }
    }

    async testAnime(req, res, next) {
        try {
            const { id } = req.params
            console.log(id)
            const anime = await animeService.getMALAnimeById(id)
            return res.json(anime)
        } catch (e) {
            next(e)
        }
    }

    async getAnimeRecommendations(req, res, next) {
        try {
            const { userId } = req.body
            const animeList = await animeService.getAnimeRecommendations(userId)
            return res.json(animeList)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AnimeController()
