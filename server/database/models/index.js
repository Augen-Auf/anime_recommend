const sequelize = require('../index')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    username: {type: DataTypes.STRING, unique: true, nullable: false},
    avatar: {type: DataTypes.STRING, nullable: true},
    email: {type: DataTypes.STRING, unique: true, nullable: false},
    password: {type: DataTypes.STRING, nullable: false},
})

const Rating = sequelize.define('ratings', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    anime: {type: DataTypes.INTEGER, nullable: false},
    rating: {type: DataTypes.INTEGER, nullable: false},
})

const Anime = sequelize.define('animes', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    anime: {type: DataTypes.INTEGER, nullable: false},
    saved: {type: DataTypes.BOOLEAN, nullable: false, defaultValue: false },
    viewed: {type: DataTypes.BOOLEAN, nullable: false, defaultValue: false },
})

const Token = sequelize.define('tokens', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING },
})

User.hasOne(Token, {
    foreignKey: 'user_id',
    targetKey: 'id'
})

User.hasOne(Anime, {
    foreignKey: 'user_id',
    targetKey: 'id'
})

User.hasOne(Rating, {
    foreignKey: 'user_id',
    targetKey: 'id'
})
module.exports = {User, Anime, Rating, Token}
