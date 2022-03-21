const {$anime, $anime_rec_sys, $mal_client_api} = require('../requests/anime')
const AnimeModel = require('../models/anime-model')
const RatingModel = require('../models/rating-model')
const AnimeDto = require("../dtos/anime-dto");
const RatingDto = require("../dtos/rating-dto");


class AnimeService {
    async getAnime(page=1, query, order=null) {
        const paramsObj = Object.assign({},
            {limit: process.env.PAGE_LIMIT},
            {page},
            query && query.trim() !== '' ? { q: query } : null,
            order && { order_by: order.order, sort: order.sort })
        console.log(paramsObj)
        const { data } = await $anime.get('anime', {params: paramsObj})
        return data
    }

    async searchAnime(query) {
        const { data } = await $anime.get('anime', { params: {q: query}})
        return data
    }


    async getMALAnimeById(animeId) {
        const anime =  await $mal_client_api.getAnimeDetail({
            id: animeId,
            fields: ['synopsis', 'mean']
        })

        return {
            mal_id: animeId,
            images: {
                jpg: {image_url: anime.main_picture.medium}
            },
            synopsis: anime.synopsis,
            title: anime.title,
            score: anime.mean,
        }
    }

    async getUserAnimeList(userId) {
        const userAnimeList = await AnimeModel.findOne({user: userId})
        if(userAnimeList) {
            return new AnimeDto(userAnimeList)
        }
        else {
            return {}
        }
    }

    async getUserAnimeListItems(userId, list) {
        const userAnimeList = await this.getUserAnimeList(userId)

        if(userAnimeList[list] && userAnimeList[list].length > 0) {
            const userAnimeListItems = userAnimeList[list]

            const animeItemsList = []

            for (const animeItem of userAnimeListItems) {
                const anime = await this.getMALAnimeById(animeItem)
                animeItemsList.push(anime)
            }

            return {list: animeItemsList, ...userAnimeList}
        }
        return {list: [], ...userAnimeList}
    }

    async setUserAnimeList(userId, animeId, list) {
        const userAnimeList = await AnimeModel.findOne({user: userId})
        console.log(userAnimeList)
        if(userAnimeList) {
            userAnimeList[list] = userAnimeList[list].includes(animeId) ?
                userAnimeList[list].filter(item => item !== animeId) : [...userAnimeList[list], animeId]
            if(list === 'viewed' && !userAnimeList[list].includes(animeId))
            {
                const userAnimeRating = await RatingModel.findOne({user: userId, anime:animeId})
                userAnimeRating.delete()
            }
            userAnimeList.save()

            return new AnimeDto(userAnimeList)
        }
        else {
            const newAnimeList = {user: userId, viewed: [], saved: []}
            const userAnimeList =  await AnimeModel.create({ ...newAnimeList, ...{[list]: [animeId]} })

            return new AnimeDto(userAnimeList)
        }
    }

    async getAnimeRatings(userId) {
        const userAnimeRatings = await RatingModel.find({user: userId})
        return {ratings: userAnimeRatings.map(rating => new RatingDto(rating))}
    }

    async setAnimeRating(userId, animeId, rating) {
        const userAnimeRating = await RatingModel.findOne({user: userId, anime:animeId})
        if(userAnimeRating) {
            if(userAnimeRating.rating === rating) {
                await userAnimeRating.delete()
            }
            else {
                userAnimeRating.rating = rating
                await userAnimeRating.save()
            }
        }
        else {
            await RatingModel.create({user: userId, anime: animeId, rating})
        }
        const userAnimeRatings = await RatingModel.find({user: userId})
        return {ratings: userAnimeRatings.map(rating => new RatingDto(rating))}
    }

    async getAnimeRecommendations(userId) {
        const userAnimeRatings = await RatingModel.find({user: userId})
        let animeRatings = null
        if(userAnimeRatings && userAnimeRatings.length > 0) {
            animeRatings = {}
            animeRatings = userAnimeRatings.forEach(item => {
                animeRatings[item.animeId] = item.rating
            })
        }
        const {data} = await $anime_rec_sys.post('make-recommend',
            Object.assign({ user_id: userId.toString() }, animeRatings && {animeRatings}))

        const animeItemsList = []

        console.log(data)

        for (const animeItem of data) {
            const anime = await this.getMALAnimeById(animeItem)
            animeItemsList.push(anime)
        }
        return {list: animeItemsList}

    }

}

module.exports = new AnimeService()