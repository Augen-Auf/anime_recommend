import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import UserService from "../services/UserService";
import {toast} from "react-toastify";

export default class Store {
    user = {}
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    async checkAuth() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/refresh', {withCredentials: true})
            console.log(response.data)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response.data)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email, password, username) {
        try {
            const response = await AuthService.registration(email, password, username)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async updateProfileData(username, email) {
        const id = toast.loading("Пожалуйста подождите...",{
            position: "bottom-center",
        })
        try {
            const {data} = await UserService.updateProfileData(this.user.id, username, email)
            localStorage.setItem('token', data.accessToken)
            this.setAuth(true)
            this.setUser(data.user)

            toast.update(id, { render: "Данные успешно изменены!",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                type: "success",
                isLoading: false,
            });
        }
        catch (e) {
            toast.update(id,{ render: e.response.data.message,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error",
                isLoading: false,
            });
            throw(e)
        }
    }

    async updateProfilePassword(oldPassword, newPassword) {
        const id = toast.loading("Пожалуйста подождите...",{
            position: "bottom-center",
        })
        try {
            const {data} = await UserService.updateProfilePassword(this.user.id, oldPassword, newPassword)
            await toast.update(id, { render: "Пароль успешно изменен!",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                type: "success",
                isLoading: false,
            });
        }
        catch (e) {
            toast.update(id,{ render: e.response.data.message,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error",
                isLoading: false,
            });
            throw(e)
        }
    }

    async updateProfileAvatar(form) {
        const id = toast.loading("Пожалуйста подождите...",{
            position: "bottom-center",
        })
        try {
            form.append('id', this.user.id)
            const {data} = await UserService.updateProfileAvatar(form)
            console.log(data.user)
            localStorage.setItem('token', data.accessToken)
            this.setAuth(true)
            this.setUser(data.user)

            toast.update(id, { render: "Аватар успешно изменен!",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                type: "success",
                isLoading: false,
            });
        }
        catch (e) {
            toast.update(id,{ render: e.response.data.message,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error",
                isLoading: false,
            });
            throw(e)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}