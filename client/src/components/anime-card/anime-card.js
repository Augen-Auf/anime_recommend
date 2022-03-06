import React, {useEffect, useState} from 'react';
import {BookmarkIcon, EyeIcon} from "@heroicons/react/solid";

const AnimeCard = ({item={}}) => {
    const [animeObj, setAnimeObj] = useState({})
    useEffect(() => {
        if(item !== {})
        {
            const {images: {jpg: {image_url}}, title, title_english, synopsis, score} = item
            setAnimeObj({image_url, title, title_english, synopsis, score})

            testCode
        }
    }, [item])
    return (
        <div className="card card-side bg-base-100 shadow-xl h-68">
            <img
                className="object-cover"
                src={animeObj?.image_url}
                alt="Movie"/>
            <div className="flex flex-col h-full bg-white text-gray-900 py-5 px-8 space-y-4">
                <h2 className="text-center px-10 text-xl font-semibold">{animeObj?.title_english ?? animeObj?.title}</h2>
                <p className="text-center flex-grow ">{animeObj?.synopsis?.slice(0,170) + '...'}</p>
                <div className="justify-between flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-400
                                                        text-gray-900 flex justify-center items-center font-bold">
                        <span>{animeObj?.score}</span>
                    </div>
                    <div className="space-x-3 flex">
                        <EyeIcon className="h-8 w-8 text-purple-400 hover:text-purple-600"/>
                        <BookmarkIcon className="h-8 w-8 text-purple-400 hover:text-purple-600"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;