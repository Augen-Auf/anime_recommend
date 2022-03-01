import {$api} from "../http";

export default class AuthService {
    static async fetchAnimeList(page) {
        return await $api.get('/anime', {params: {page}})
    }
}