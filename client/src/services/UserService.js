import {$api} from "../http";

export default class UserService {
    static async updateProfileData(id, username, email) {
        return await $api.post('/user/update', {id, username, email})
    }

    static async updateProfileAvatar(form) {
        return await $api.post('/avatar/upload', form, {headers: {'Content-Type': 'multipart/form-data'}})
    }

    static async updateProfilePassword(id, oldPassword, newPassword) {
        return await $api.post('/password/update', {id, oldPassword, newPassword})
    }
}