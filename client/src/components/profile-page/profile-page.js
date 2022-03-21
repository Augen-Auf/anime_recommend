import React, {useEffect, useState} from 'react';
import AnimeCard from "../anime-card";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";
import Loader from "react-spinners/BeatLoader";
import {useNavigate} from "react-router-dom";
import {RECOMMEND_PAGE, SETTINGS_PAGE} from "../../utils/consts";
import AnimeService from "../../services/AnimeService";
import {CancelToken} from "../../http";

const ProfilePage = () => {
    const {store} = useAuth()
    const [cancelToken, setCancelToken] = useState(undefined)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] =  useState('viewed')
    const [activeList, setActiveList] =  useState(null)
    const [userRatings, setUserRatings] = useState([])
    const [userViewedList, setUserViewedList] = useState([])
    const [userSavedList, setUserSavedList] = useState([])

    useEffect(async () => {
        if (store.user) {
            setActiveList(null)
            const {data: {viewed, saved}} = await AnimeService.getUserAnimeList(store.user.id)
            if (saved) {
                setUserSavedList(saved)
            }
            if (viewed) {
                setUserViewedList(viewed)
            }
            const {data: {ratings}} = await AnimeService.getUserRatings(store.user.id)
            setUserRatings(ratings)
        }
    }, [store.user])

    useEffect(async () => {
        try {
            if (store.user) {
                const token = CancelToken.source()
                setCancelToken(token)
                setActiveList(null)
                const {data: {list = []}} = await AnimeService.getUserAnimeListItems(store.user.id, activeTab, token)
                setActiveList(list)
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [activeTab, store.user])

    const updateUserRating = async (animeId, rating) => {
        const {data: {ratings}} = await AnimeService.setUserRating(store.user.id, animeId, rating)
        setUserRatings(ratings)
    }


    const changeTab = async (tab) => {
        console.log(cancelToken)
        if (cancelToken) {
            cancelToken.cancel("Operation canceled due to new request.")
        }
        setActiveTab(tab)
    }

    const updateUserAnimeList = async (animeId, list, isDelete) => {
        if(isDelete && list === activeTab)
            setActiveList(activeList.filter(anime => anime.mal_id !== animeId))
        const {data: {viewed, saved}} = await AnimeService.setUserAnimeList(store.user.id, animeId, list)
        if (saved) {
            setUserSavedList(saved)
        }
        if (viewed) {
            setUserViewedList(viewed)
        }
        const {data: {ratings}} = await AnimeService.getUserRatings(store.user.id)
        setUserRatings(ratings)
    }

    return (
        <div className="mx-auto space-y-14 sm:px-20 px-5">
            <div className="space-y-5">
                <p className="font-semibold text-xl text-purple-400 text-center">Профиль пользователя</p>
                <div className="flex justify-center items-center">
                    <button
                        className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"
                        onClick={() => navigate(RECOMMEND_PAGE)}>Рекомендации</button>
                    <div className="flex flex-col justify-center items-center px-10">
                        <div className="avatar">
                            <div className="w-40 h-40 rounded-full ring-4 ring-secondary">
                                <img src={store.user?.avatar && process.env.REACT_APP_API_URL + '/avatar/' + store.user.avatar}/>
                            </div>
                        </div>
                        <span className="font-bold text-2xl text-purple-400 py-2">{store.user?.username}</span>
                    </div>
                    <button
                        className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"
                        onClick={() => navigate(SETTINGS_PAGE)}>Редактировать</button>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-wrap justify-center space-x-7">
                    <button
                        className={`w-1/3 rounded-box font-semibold uppercase px-3 py-4 ${activeTab === 'viewed' ? 'bg-purple-400' : 'bg-gray-700 hover:bg-gray-600 text-white' }`}
                        onClick={() => changeTab('viewed')}
                        aria-current="page">Просмотренные</button>
                    <button
                        className={`w-1/3 rounded-box font-semibold uppercase px-3 py-4 ${activeTab === 'saved' ? 'bg-purple-400' : 'bg-gray-700 hover:bg-gray-600 text-white' }`}
                        onClick={() => changeTab('saved')}>Избранное</button>
                </div>
            </div>
            {
                activeList !== null ?
                    activeList.length > 0 ?
                        <div className="mx-auto w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5 pb-16">
                            {
                                activeList.map(anime =>
                                    <AnimeCard key={"anime_card_" + anime.mal_id}
                                               item={anime}
                                               viewed={userViewedList.includes(anime.mal_id)}
                                               saved={userSavedList.includes(anime.mal_id)}
                                               rating={userRatings.find(rating => rating.anime === anime.mal_id)?.rating}
                                               onAnimeStateChanged={(animeId, list, isDelete) => updateUserAnimeList(animeId, list, isDelete)}
                                               onRatingStateChanged={(animeId, rating) => updateUserRating(animeId, rating)} />
                                )
                            }
                        </div>
                        :
                        <p className="text-center text-white font-semibold">Тут ничего пока нет</p>
                    :
                    <div className="mx-auto w-fit pb-16">
                        <Loader color={"#C084FC"} size={30} speedMultiplier={1} />
                    </div>
            }
        </div>
    );
};

export default observer(ProfilePage);