import React, {useCallback, useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {MAIN_PAGE} from "../../utils/consts";
import {DownloadIcon} from "@heroicons/react/solid";
import {RefreshIcon, XIcon} from "@heroicons/react/outline";
import {shallowEqual} from "../../utils/functions";
import {toast} from "react-toastify";

const SettingsPage = () => {
    const [avatar, setAvatar] = useState()
    const {store} = useAuth()
    const navigation = useNavigate()

    const schema = yup.object({
        username: yup.string().required(),
        email: yup.string().email('Введеная почта не валидна').required(),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        setValue: setValue2
    } = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        if(store.user)
        {
            setValue('username',store.user.username)
            setValue('email', store.user.email)
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

    const updateUserData = async (data) => {
        console.log(data)
        if(!shallowEqual(data, {email: store.user.email, username: store.user.username}))
        {
            await store.updateProfileData(data.username, data.email)
        }

    }

    const updateUserPassword = async (data) => {
        console.log(data)
        await store.updateProfilePassword(data.oldPassword, data.newPassword)
        await store.logout()
        navigation(MAIN_PAGE)
    }

    const avatarImage = useCallback(() => {
        return (avatar && URL.createObjectURL(avatar)) ||
            (store.user.avatar && process.env.REACT_APP_API_URL + '/avatar/' + store.user.avatar)
    }, [avatar, store.user])

    const refreshValue = (field) => {
      reset({[field]: store.user[field]})
    }


    return (
        <div className="pb-10">
            <div className="mx-auto space-y-5 flex flex-col items-center w-1/3">
                <div className="flex flex-col items-center space-y-5">
                    <div className="avatar">
                        <div className="w-40 h-40 rounded-full bg-purple-400">
                            <img src={avatarImage()} className="bg-purple-400"/>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <label className="cursor-pointer">
                            <span
                                className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"><DownloadIcon className="h-6 w-6"/></span>
                            <input type='file' className="hidden" onChange={(e) => updateAvatar(e.target.files[0])}/>
                        </label>
                        {
                            avatar && <button className="btn bg-red-400 border-red-400 hover:border-red-600 hover:bg-red-600" onClick={deleteAvatar}>
                                <XIcon className="h-6 w-6"/>
                            </button>
                        }
                    </div>
                </div>
                <hr className="border-t-2 border-gray-400 w-full"/>
                <form key={1} className="w-full space-y-3" onSubmit={handleSubmit(updateUserData)}>
                    <p className="text-lg text-secondary font-semibold w-full text-center">Данные профиля</p>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Почта</span>
                        </label>
                        <div className="input-group">
                        <input type="text"
                               placeholder="email@example.com"
                               {...register("email", {required: true})}
                               className="input input-bordered border-purple-400 w-full"/>
                            <button
                                type="button"
                                className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"
                                onClick={() => refreshValue('email')}>
                                <RefreshIcon className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Имя пользователя</span>
                        </label>
                        <div className="input-group">
                        <input type="text"
                               placeholder="Username"
                               {...register("username", {required: true})}
                               className="input input-bordered border-purple-400 w-full"/>
                            <button
                                type="button"
                                className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"
                                onClick={() => refreshValue('username')}>
                                <RefreshIcon className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600">
                        Изменить
                    </button>
                </form>
                <hr className="border-t-2 border-gray-400 w-full"/>
                <form key={2} className="w-full space-y-2" onSubmit={handleSubmit2(updateUserPassword)}>
                    <p className="text-lg font-semibold w-full text-center text-secondary">Новый пароль</p>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Старый пароль</span>
                        </label>
                        <input type="password"
                               placeholder="Old password"
                               {...register2("oldPassword")}
                               className="input input-bordered border-purple-400 w-full"/>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Новый пароль</span>
                        </label>
                        <input type="password"
                               placeholder="New password"
                               {...register2("newPassword")}
                               className="input input-bordered border-purple-400 w-full"/>
                    </div>
                    <button type="submit" className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600">
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default observer(SettingsPage);