import React, {useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {MAIN_PAGE} from "../../utils/consts";

const SettingsPage = () => {
    const [avatar, setAvatar] = useState()
    const {store} = useAuth()
    const navigation = useNavigate()

    const [email, setEmail] = useState(store.user.email)
    const [username, setUsername] = useState(store.user.username)
    const [newPassword, setNewPassword] = useState(null)
    const [oldPassword, setOldPassword] = useState(null)

    useEffect(() => {
        if(store.user)
        {
            setUsername(store.user.username)
            setEmail(store.user.email)
        }
    }, [store.user])

    const updateAvatar = async (file) => {
        console.log(file)
        if(file) {
            setAvatar(file)
            const form = new FormData()
            form.append('avatar', file)
            await store.updateProfileAvatar(form)
        }
    }

    const deleteAvatar = () => {
        setAvatar(null)
    }

    const updateUserData = async () => {
        await store.updateProfileData(username, email)
    }

    const updateUserPassword = async () => {
        await store.updateProfilePassword(oldPassword, newPassword)
        await store.logout()
        navigation(MAIN_PAGE)
    }

    const avatarImage = useCallback(() => {
        return (avatar && URL.createObjectURL(avatar)) ||
            (store.user.avatar && process.env.REACT_APP_API_URL + '/avatar/' + store.user.avatar)
    }, [avatar, store.user])


    return (
        <div className="pb-10">
            <div className="mx-auto space-y-3 flex flex-col items-center w-1/3">
                <div className="flex flex-col items-center space-y-5">
                    <div className="avatar">
                        <div className="w-40 h-40 rounded-full bg-purple-400">
                            <img src={avatarImage()} className="bg-purple-400"/>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <label className="cursor-pointer">
                            <span
                                className="btn btn-primary">Загрузить</span>
                            <input type='file' className="hidden" onChange={(e) => updateAvatar(e.target.files[0])}/>
                        </label>
                        {
                            avatar && <button className="btn btn-error" onClick={deleteAvatar}>
                                Удалить
                            </button>
                        }
                    </div>
                </div>
                <div className="divider w-full"/>
                <div className="w-full space-y-3">
                    <p className="text-lg font-semibold w-full text-center">Данные профиля</p>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Почта</span>
                        </label>
                        <input type="text"
                               placeholder="email@example.com"
                               onChange={(e) => setEmail(e.target.value)}
                               className="input input-bordered border-purple-400 w-full"/>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Имя пользователя</span>
                        </label>
                        <input type="text"
                               placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)}
                               className="input input-bordered border-purple-400 w-full"/>
                    </div>
                    <button className="btn btn-primary" onClick={updateUserData}>
                        Изменить
                    </button>
                </div>
                <div className="divider w-full"/>
                <div className="w-full space-y-2">
                    <p className="text-lg font-semibold w-full text-center">Новый пароль</p>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Старый пароль</span>
                        </label>
                        <input type="password"
                               placeholder="Old password"
                               onChange={(e) => setOldPassword(e.target.value)}
                               className="input input-bordered border-purple-400 w-full"/>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Новый пароль</span>
                        </label>
                        <input type="password"
                               placeholder="New password"
                               onChange={(e) => setNewPassword(e.target.value)}
                               className="input input-bordered border-purple-400 w-full"/>
                    </div>
                    <button className="btn btn-primary" onClick={updateUserPassword}>
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default observer(SettingsPage);