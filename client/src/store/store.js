import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";

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