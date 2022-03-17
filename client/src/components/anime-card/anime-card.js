import React, {useCallback, useEffect, useState} from 'react';
import {BookmarkIcon, EyeIcon, EyeOffIcon} from "@heroicons/react/solid";
import {useAuth} from "../../contexts/AuthContext";
import AnimeService from "../../services/AnimeService";
import {XIcon} from "@heroicons/react/outline";
import {observer} from "mobx-react-lite";

const AnimeCard = ({item={}, saved = false, viewed = false, mode="default", onAnimeStateChanged}) => {
    const { store } = useAuth()

    const [animeObj, setAnimeObj] = useState({})
    const [isSaved, setIsSaved] = useState(false)
    const [isViewed, setIsViewed] = useState(false)
    useEffect(() => {
        if(item !== {})
        {
            const {images: {jpg: {image_url}}, title, title_english, synopsis, score, mal_id} = item
            setAnimeObj({image_url, title, title_english, synopsis, score, mal_id})
        }
    }, [item])

    useEffect(() => {
            setIsSaved(saved)
            setIsViewed(viewed)
    }, [viewed, saved])

    const updateViewedSaved = (animeId, list, isDelete = false) => {
        list === 'viewed' ? setIsViewed(!isViewed) : setIsSaved(!isSaved)
        onAnimeStateChanged(animeId, list, isDelete)
    }

    return (
        <div className="sm:max-w-xl sm:mx-auto">
            <div className="bg-white shadow-lg border-gray-100 h-64	border sm:rounded-3xl p-5 flex space-x-8">
                <div className="h-full w-2/5">
                    <img className="rounded-3xl shadow-lg h-full w-full object-cover"
                         src={animeObj?.image_url}
                         alt=""/>
                </div>
                <div className="flex flex-col w-3/5 space-y-4">
                    <div className="flex justify-between space-x-3 h-1/5">
                        <div className="h-full flex justify-start items-center w-3/5 overflow-y-hidden">
                            <span className="text font-semibold line-clamp-2 text-secondary">
                                {animeObj?.title_english ?? animeObj?.title}
                            </span>
                        </div>
                        {
                            animeObj?.score &&
                            <div className="w-11 h-11 self-start rounded-xl bg-purple-400
                                                            text-gray-900 flex justify-center items-center font-bold">
                                <span>{animeObj?.score}</span>
                            </div>
                        }
                    </div>
                    <div className="flex-grow w-full">
                    <p className="text-gray-400 text-sm line-clamp-5">
                        {animeObj?.synopsis}
                    </p>
                    </div>
                    <div className="justify-between flex items-center">
                        {
                            store.isAuth  &&
                            <div className="space-x-2 flex">
                                <EyeIcon
                                    className={`h-6 w-6 ${isViewed ? 'text-purple-600' : 'text-purple-400'} hover:text-purple-600`}
                                    onClick={() => updateViewedSaved(animeObj.mal_id, 'viewed', isViewed)}/>

                                <BookmarkIcon
                                    className={`h-6 w-6 ${isSaved ? 'text-purple-600' : 'text-purple-400'} hover:text-purple-600`}
                                    onClick={() => updateViewedSaved(animeObj.mal_id, 'saved', isSaved)}/>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default observer(AnimeCard);