const axios = require("axios")

const anime = axios.create({
    baseURL: process.env.ANIME_API_URL,
    params: {limit: process.env.PAGE_LIMIT}
})

module.exports = anime;