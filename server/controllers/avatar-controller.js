const avatarService = require("../service/avatar-service")
const userService = require("../service/user-service");

class AvatarController {
    async uploadAvatar(req, res, next) {
        const key = req.file.key
        const { id } = req.body
        const userData = await avatarService.saveAvatarKey(id, key)

        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(userData);
    }

    getAvatar(req, res, next) {
        const { key } = req.params
        const readStream = avatarService.getAvatar(key)

        readStream.pipe(res)
    }
}

module.exports = new AvatarController()