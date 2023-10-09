const {$anime, $anime_rec_sys, $mal_client_api} = require('../requests/anime')
const { Anime, Rating } = require('../database/models')
const AnimeDto = require("../dtos/anime-dto");
const RatingDto = require("../dtos/rating-dto");


class AnimeService {
    async getAnime(page=1, query, order=null) {
        const paramsObj = Object.assign({},
            {limit: process.env.PAGE_LIMIT},
            {page},
            query && query.trim() !== '' ? { q: query } : null,
            order && { order_by: order.order, sort: order.sort })
        //console.log(paramsObj)
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
        const userAnimesList = await Anime.findAll({ where: { user_id: userId } })
        //console.log("anime list", userAnimesList)
        if(userAnimesList && userAnimesList.length > 0) {
            const userAnimeList = {
                user_id: userAnimesList[0].user_id,
                viewed: userAnimesList.filter(a => a.viewed).map(a => a.anime),
                saved: userAnimesList.filter(a => a.saved).map(a => a.anime)
            }

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
        const userAnimeList = await Anime.findAll({ where: { user_id: userId } })
        const neededAnime = userAnimeList.find(a => a.anime === animeId)

        console.log(userId)
        console.log(animeId)
        if(neededAnime)
        {
            neededAnime[list] = !neededAnime[list]

            if(list === 'viewed' && !neededAnime[list])
            {
                const userAnimeRating = await Rating.findOne({ where: { user_id: userId, anime: animeId } })
                if(userAnimeRating)
                    await userAnimeRating.destroy()
            }

            await  neededAnime.save()
        }
        else
        {
            let newAnimeRecord = { user_id: userId, anime: animeId }
            newAnimeRecord = await Anime.create({ ...newAnimeRecord, ...{ [list]: true } })
            userAnimeList.push(newAnimeRecord)
        }

        return new AnimeDto({
            user_id: userAnimeList[0].id,
            viewed: userAnimeList.filter(a => a.viewed).map(a => a.anime),
            saved: userAnimeList.filter(a => a.saved).map(a => a.anime)
        })
    }

    async getAnimeRatings(userId) {
        const userAnimeRatings = await Rating.findAll({ where: { user_id: userId } })
        return { ratings: userAnimeRatings.map(rating => new RatingDto(rating)) }
    }

    async setAnimeRating(userId, animeId, rating) {
        const userAnimeRatings = await Rating.findAll({ where: { user_id: userId } })
        const userAnimeRating = userAnimeRatings.find(r => r.anime === animeId)

        if(userAnimeRating) {
            if(userAnimeRating.rating === rating) {
                await userAnimeRating.destroy()
            }
            else {
                userAnimeRating.rating = rating
                await userAnimeRating.save()
            }
        }
        else {
            const newRating = await Rating.create({user_id: userId, anime: animeId, rating})
            userAnimeRatings.push(newRating)
        }

        return { ratings: userAnimeRatings.map(rating => new RatingDto(rating)) }
    }

    async getAnimeRecommendations(userId) {
        const userAnimeRatings = await Rating.findAll({ where: { user_id: userId } })

        let animeRatings = null

        if(userAnimeRatings && userAnimeRatings.length > 0) {
            animeRatings = {}
            userAnimeRatings.forEach(item => {
                animeRatings[item.anime] = item.rating
            })
        }

        const { data } = await $anime_rec_sys.post('make-recommend',
            Object.assign({ user_id: userId.toString() }, animeRatings && { animeRatings }))

        const animeItemsList = []

        console.log(data)

        for (const animeItem of data) {
            const anime = await this.getMALAnimeById(animeItem)
            animeItemsList.push(anime)
        }
        return { list: animeItemsList }

    }

}

module.exports = new AnimeService()
