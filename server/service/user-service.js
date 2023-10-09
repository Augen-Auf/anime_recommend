const { User } = require('../database/models')
const tokenService = require('../service/token-service')
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")
const bcrypt = require('bcrypt')

class UserService {
    async registration(email, password, username) {
        const candidate = await User.findOne({ where: { email, username } })
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с такими данными уже существует')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({email, password: hashPassword, username})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
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

    async updateProfile(id, email, username) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw ApiError.BadRequest('Пользователя не найден')
        }
        const newUser = Object.assign(user, { email, username })
        await newUser.save()
        const userDto = new UserDto(newUser)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findOne({ where: { id } })

        if (!user) {
            throw ApiError.BadRequest('Пользователя не найден')
        }

        const isOldPassEquals = await bcrypt.compare(oldPassword, user.password)

        if (!isOldPassEquals) {
            throw ApiError.BadRequest('Указанный старый пароль не совпадает с текущим')
        }

        const isNewPassEquals = await bcrypt.compare(newPassword, user.password)
        if (isNewPassEquals) {
            throw ApiError.BadRequest('Указанный новый пароль совпадает с текущим')
        }

        const hashPassword = await bcrypt.hash(newPassword, 3)
        const newUser = Object.assign(user, {password: hashPassword})

        await newUser.save()
        const userDto = new UserDto(newUser)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken)
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

        //console.log(userData)

        const user = await User.findOne({ where: { id: userData.id } })
        const userDto = new UserDto(user)
        console.log(userDto)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService()
