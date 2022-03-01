const $anime = require('../requests/anime')

class AnimeService {
    async getAnime(page=1) {
        const { data } = await $anime.get('anime', { params: {page}})
        return data
    }
}

module.exports = new AnimeService()