import React, {useState} from 'react';
import AnimeCard from "../anime-card";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";

const ProfilePage = () => {
    const {store} = useAuth()
    const [avatar, setAvatar] = useState(null)

    const uploadAvatar = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('avatar', avatar)
        await axios.post('http://localhost:5000/api/avatar/upload', form, {headers: {'Content-Type': 'multipart/form-data'}})
    }
    return (
        <div className="mx-auto space-y-14">
            <div className="space-y-5">
                <p className="font-semibold text-xl text-purple-400 text-center">Профиль пользователя</p>
                <div className="flex justify-center items-center">
                    <button className="btn btn-primary">Рекомендации</button>
                    <div className="flex flex-col justify-center items-center px-10">
                        <div className="avatar">
                            <div className="w-40 h-40 rounded-full">
                                <img src={store.user?.avatar && process.env.REACT_APP_API_URL + '/avatar/' + store.user.avatar}/>
                            </div>
                        </div>
                        <span className="font-bold text-2xl text-purple-400">{store.user?.username}</span>
                    </div>
                    <button className="btn btn-primary">Редактировать</button>
                </div>
            </div>
            <div className="divider"/>
            <form onSubmit={uploadAvatar}>
                <input type="file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])}/>
                <button type="submit" className="btn btn-primary">Загрузить аватар</button>
            </form>
            {/*<div className="space-y-5">*/}
            {/*    <p className="font-semibold text-xl text-purple-400 text-center">Просмотренное аниме</p>*/}
            {/*    <div className="grid grid-cols-2 gap-10 w-4/5 mx-auto">*/}
            {/*        {*/}
            {/*            [1,2,3,4,5,6,7,8,9].map(item =>*/}
            {/*                <AnimeCard key={`anime_card_${item}`}/>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default observer(ProfilePage);