const jwt = require("jsonwebtoken")
const { Token } = require('../database/models')
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'})
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { user_id: userId } })
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return await Token.create({ user_id: userId, refreshToken })
    }

    async removeToken(refreshToken) {
        const token = await Token.findOne({ where: { refreshToken } })
        return await token.destroy();
    }

    async findToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken } });
    }
}

module.exports = new TokenService()
