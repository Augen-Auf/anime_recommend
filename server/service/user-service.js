const UserModel = require('../models/user-model')
const tokenService = require('../service/token-service')
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")
const bcrypt = require('bcrypt')

class UserService {
    async registration(email, password, username) {
        const candidate = await UserModel.findOne({email, username})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с такими данными уже существует')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashPassword, username})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователя не зарегистрирован')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto}
    }

    async updateProfile(id, email, username, avatar) {
        const user = await UserModel.findOne({_id: id})
        if (!user) {
            throw ApiError.BadRequest('Пользователя не найден')
        }

        const newUser = await user.update({email, username})

        const userDto = new UserDto(newUser)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken)
        {
            throw ApiError.UnauthorizedError()
        }
        
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto}
    }
}

module.exports = new UserService()