import {$api} from "../http";

export default class AuthService {
    static async fetchAnimeList(page, query, order=null) {
        return await $api.post('/anime', {page, query, order})
    }

    static async setUserAnimeList(userId, animeId, list) {
        return await $api.post('/user/anime/update', {userId, animeId, list})
    }

    static async getUserAnimeList(userId) {
        return await $api.post('/user/anime/get', {userId})
    }
    static async getUserAnimeListItems(userId, list, cancelToken) {
        return await $api.post('/anime/user/get', {userId, list}, {cancelToken: cancelToken.token})
    }

    static async searchAnime(query) {
        return await $api.get('/anime/search', {params: {query}})
    }

    static async getAnimeRecommendations(userId) {
        return await $api.post('/anime/recommendations', {userId})
    }

    static async setUserRating(userId, animeId, rating) {
        return await $api.post('/user/anime/rating', {userId, animeId, rating})
    }

    static async getUserRatings(userId) {
        return await $api.post('/user/anime/ratings', {userId})
    }
}