require('dotenv').config()
const { User }= require('../database/models')
const s3 = require("../utils/s3")
const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");
const tokenService = require("../service/token-service");

class AvatarService {
    getAvatar(key) {
        const downloadParams = {
            Key: key,
            Bucket: process.env.AWS_BUCKET_NAME
        }

        return s3.getObject(downloadParams).createReadStream()
    }

    async saveAvatarKey(id, key) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw ApiError.BadRequest('Пользователя не найден')
        }

        const newUser = Object.assign(user, { avatar: key })
        await newUser.save()

        const userDto = new UserDto(newUser)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}

module.exports = new AvatarService()
