import React, {useCallback, useEffect, useState} from 'react';
import {BookmarkIcon, EyeIcon, EyeOffIcon, StarIcon} from "@heroicons/react/solid";
import {useAuth} from "../../contexts/AuthContext";
import AnimeService from "../../services/AnimeService";
import {XIcon} from "@heroicons/react/outline";
import {observer} from "mobx-react-lite";
import RatingForm from "../rating-modal/rating-form";
import RatingModal from "../rating-modal";

const AnimeCard = ({
                       item={},
                       saved = false,
                       viewed = false,
                       rating = 0,
                       onAnimeStateChanged,
                       onRatingStateChanged}) => {
    const { store } = useAuth()

    const [animeObj, setAnimeObj] = useState({})
    const [userRating, setUserRating] = useState(0)
    const [isSaved, setIsSaved] = useState(false)
    const [isViewed, setIsViewed] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false);
    }

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

    useEffect(() => {
        if(!isViewed) {
            setUserRating(0)
        }
    },[isViewed])

    useEffect(() => {
        setUserRating(rating)
    }, [rating])

    const updateViewedSaved = (animeId, list, isDelete = false) => {
        list === 'viewed' ? setIsViewed(!isViewed) : setIsSaved(!isSaved)
        onAnimeStateChanged(animeId, list, isDelete)
    }

    const updateRating = (number, isDelete) => {
        closeModal()
        onRatingStateChanged(animeObj.mal_id, number, isDelete)
    }

    return (
        <>
            <div className="sm:max-w-xl sm:mx-auto">
                <div className="bg-white shadow-lg border-gray-100 h-64	border rounded-3xl p-5 flex space-x-8">
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
                                <div className="flex w-full justify-between">
                                    <div className="flex space-x-2 justify-center items-center space-x-2">
                                        <EyeIcon
                                            className={`h-6 w-6 ${isViewed ? 'text-purple-600' : 'text-purple-400'} hover:text-purple-600`}
                                            onClick={() => updateViewedSaved(animeObj.mal_id, 'viewed', isViewed)}/>

                                        <BookmarkIcon
                                            className={`h-6 w-6 ${isSaved ? 'text-purple-600' : 'text-purple-400'} hover:text-purple-600`}
                                            onClick={() => updateViewedSaved(animeObj.mal_id, 'saved', isSaved)}/>
                                    </div>
                                    {isViewed &&
                                    <div>
                                        {
                                            userRating > 0 ?
                                                <div
                                                    className="rounded-lg px-2 flex justify-center items-center bg-secondary hover:bg-purple-600"
                                                    onClick={() => setIsOpen(true)}>
                                                    <span className="font-semibold">{userRating}</span>
                                                    <StarIcon
                                                        className={`h-6 w-6`}/>
                                                </div>
                                                :
                                                <StarIcon
                                                    className={`h-6 w-6 ${rating > 0 ? 'text-purple-600' : 'text-purple-400'} hover:text-purple-600`}
                                                    onClick={() => setIsOpen(true)}/>
                                        }
                                    </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
            <RatingModal
                isOpen={isOpen}
                closeModal={closeModal}
                userRating={userRating}
                anime={animeObj?.title_english ?? animeObj?.title}
                onChangeRating={(number, isDelete) => updateRating(number, isDelete)} />
        </>
    );
};

export default observer(AnimeCard);