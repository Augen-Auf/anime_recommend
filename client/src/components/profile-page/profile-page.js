import React from 'react';
import AnimeCard from "../anime-card";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";

const ProfilePage = () => {
    const {store} = useAuth()
    return (
        <div className="mx-auto space-y-14">
            <div className="space-y-5">
                <p className="font-semibold text-xl text-purple-400 text-center">Профиль пользователя</p>
                <div className="flex justify-center items-center">
                    <button className="btn btn-primary">Рекомендации</button>
                    <div className="flex flex-col justify-center items-center px-10">
                        <div className="avatar">
                            <div className="w-40 h-40 rounded-full">
                                <img src="https://api.lorem.space/image/face?hash=28212"/>
                            </div>
                        </div>
                        <span className="font-bold text-2xl text-purple-400">{store.user?.username}</span>
                    </div>
                    <button className="btn btn-primary">Редактировать</button>
                </div>
            </div>
            <div className="divider"/>
            <div className="space-y-5">
                <p className="font-semibold text-xl text-purple-400 text-center">Просмотренное аниме</p>
                <div className="grid grid-cols-2 gap-10 w-4/5 mx-auto">
                    {
                        [1,2,3,4,5,6,7,8,9].map(item =>
                            <AnimeCard key={`anime_card_${item}`}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(ProfilePage);