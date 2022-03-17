import React, {useEffect, useState} from 'react';
import AnimeService from '../../services/AnimeService'
import {useAuth} from "../../contexts/AuthContext";
import AnimeCard from "../anime-card";
import Loader from "react-spinners/BeatLoader";

const RecommendationPage = () => {
    const {store} = useAuth()
    const [recAnimeList, setRecAnimeList] = useState([])

    useEffect(async () => {
        if(store.user) {
            const {data} = await AnimeService.getAnimeRecommendations(store.user.id)
            setRecAnimeList(data.list)
        }
    }, [store.user])

    return (
        <div className="px-12 mx-auto">
            <div className="flex flex-col items-center space-y-10">
                <p className="text-secondary font-semibold text-xl">Рекомедации для {store.user?.username}</p>
                {
                    recAnimeList.length > 0 ?
                        <div className="grid grid-cols-3 gap-5 pb-16">
                            {
                                 recAnimeList.map(anime =>
                                        <AnimeCard key={"anime_card_" + anime.mal_id}
                                                   item={anime}
                                                   onAnimeStateChanged={(animeId, list) => console.log('state update')}/>
                                    )
                            }
                        </div> :
                        <div className="mx-auto w-fit pb-16">
                            <Loader color={"#C084FC"} size={30} speedMultiplier={1}/>
                        </div>
                }
            </div>
        </div>
    );
};

export default RecommendationPage;