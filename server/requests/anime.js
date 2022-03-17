const axios = require("axios")
const mal = require('mal-management-js')

const $anime = axios.create({
    baseURL: process.env.ANIME_API_URL,
})

const $anime_rec_sys = axios.create({
    baseURL: process.env.ANIME_REC_API_URL,
})

const $mal_client_api = mal.createClient({
    clientId: process.env.MAL_CLIENT_ID
})

module.exports = {$anime, $anime_rec_sys, $mal_client_api};