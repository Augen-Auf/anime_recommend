const Router = require('express').Router
const userController = require("../controllers/user-controller")
const animeController = require("../controllers/anime-controller")
const avatarController = require("../controllers/avatar-controller")
const router = new Router()
const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth-middleware")
const multerS3Uploader = require("../utils/multerS3Uploader")
const {route} = require("express/lib/router");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', body('email').isEmail(), userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.post('/user/update', body('email').isEmail(), userController.updateProfile)
router.post('/password/update', userController.updatePassword)

router.get('/anime', animeController.getAnimeList)

router.get('/avatar/:key', avatarController.getAvatar)

router.post('/avatar/upload', multerS3Uploader.single('avatar'), avatarController.uploadAvatar)


module.exports = router