import React from 'react';
import {BookmarkIcon, EyeIcon} from "@heroicons/react/solid";

const ProfilePage = () => {
    return (
        <div className="mx-auto space-y-14">
            <div className="space-y-5">
                <p className="font-semibold text-xl text-purple-400 text-center">Профиль пользователя</p>
                <div className="flex justify-center items-center space-x-10">
                    <button className="btn btn-primary">Рекомендации</button>
                    <div className="flex flex-col justify-center items-center">
                        <div className="avatar">
                            <div className="w-40 h-40 rounded-full">
                                <img src="https://api.lorem.space/image/face?hash=28212"/>
                            </div>
                        </div>
                        <span className="font-bold text-2xl text-purple-400">Username</span>
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
                            <div className="card card-side bg-base-100 shadow-xl h-68">
                                <img
                                    className="object-cover"
                                    src="https://api.lorem.space/image/movie?w=200&h=280"
                                    alt="Movie"/>
                                <div className="flex flex-col h-full bg-white text-gray-900 py-5 px-8 space-y-4">
                                    <h2 className="text-center px-10 text-xl font-semibold">Рыбка Поньо на утесе</h2>
                                    <p className="text-center flex-grow ">История повествует о дружбе двух пятилетних детей,
                                        мальчика Сосукэ и рыбки
                                        Поньо, дочери колдуна и морской богини.</p>
                                    <div className="justify-between flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-purple-400
                                                        text-gray-900 flex justify-center items-center font-bold">
                                            <span>7.9</span>
                                        </div>
                                        <div className="space-x-3 flex">
                                            <EyeIcon className="h-8 w-8 text-purple-400 hover:text-purple-600"/>
                                            <BookmarkIcon className="h-8 w-8 text-purple-400 hover:text-purple-600"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;