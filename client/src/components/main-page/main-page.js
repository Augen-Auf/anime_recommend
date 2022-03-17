import React, {useEffect, useRef, useState} from 'react';
import AnimeCard from "../anime-card";
import AnimeService from "../../services/AnimeService"
import Pagination from "rc-pagination";
import {useAuth} from "../../contexts/AuthContext";
import localeInfo from '../../utils/locale/ru_RU';
import {ArrowCircleLeftIcon, ArrowCircleRightIcon, ArrowDownIcon, ArrowUpIcon, TrashIcon} from "@heroicons/react/solid";
import {observer} from "mobx-react-lite";
import Loader from "react-spinners/BeatLoader";
import FilterPanel from "../filter-panel";

const MainPage = () => {
    const {store} = useAuth()

    const [animeList, setAnimeList] = useState([])
    const [loading, setLoading] = useState(false)
    const [userViewedList, setUserViewedList] = useState([])
    const [userSavedList, setUserSavedList] = useState([])
    const [lastVisiblePage, setLastVisiblePage] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [orderObj, setOrderObj] = useState(null)

    const queryInput = useRef('');

    useEffect(async () => {
        if (store.user) {
            const {data: {viewed, saved}} = await AnimeService.getUserAnimeList(store.user.id)
            if (saved) {
                setUserSavedList(saved)
            }
            if (viewed) {
                setUserViewedList(viewed)
            }
        }
    }, [store.user])

    useEffect(async () => {
        await loadAnimeList()
    }, [])


    const loadAnimeList = async (page=1, query='', order=null) => {
        setLoading(true)

        const {data: {data: animeArray, pagination: {last_visible_page}}} = await AnimeService.fetchAnimeList(page, query, order)
        setAnimeList(animeArray)
        setLastVisiblePage(last_visible_page)

        setLoading(false)
    }



    const updateUserAnimeList = async (animeId, list) => {
        const {data: {viewed, saved}} = await AnimeService.setUserAnimeList(store.user.id, animeId, list)
        if (saved) {
            setUserSavedList(saved)
        }
        if (viewed) {
            setUserViewedList(viewed)
        }
    }

    const resetQuery = async () => {
        if(searchQuery !== '') {
            setSearchQuery('')
            queryInput.current.value = ''
            setPage(1)
            await loadAnimeList(1, '', orderObj)
        }
    }

    const filterItems = async (orderObj) => {
        setOrderObj(orderObj ? orderObj : null)
        setPage(1)
        await loadAnimeList(1, searchQuery, orderObj)
    }
    
    const changePage = async (page) => {
      setPage(page);
      await loadAnimeList(page, searchQuery, orderObj)
    }

    const searchAnime = async () => {
        const query = queryInput.current.value
        if(query && query.trim() !== '')
        {
            setSearchQuery(query)
            await loadAnimeList(1, query, orderObj)
        }
    }

    const itemRender = (current, type, element) => {
        if (type === 'prev') {
            return <button className="btn btn-circle bg-white border-purple-400 hover:bg-purple-400">
                <ArrowCircleLeftIcon className="h-6 w-6"/>
            </button>;
        }
        if (type === 'next') {
            return <button className="btn btn-circle bg-white border-purple-400 hover:bg-purple-400">
                <ArrowCircleRightIcon className="h-6 w-6"/>
            </button>;
        }
        if (type === 'jump-next' || type === 'jump-prev') {
            return <button className="btn btn-circle bg-white border-purple-400 hover:bg-purple-400">...</button>;
        }
        return <button
            className={`btn btn-circle ${current === page ? 'bg-secondary' :'bg-white'} border-purple-400 hover:bg-purple-400 font-bold`}>
            {element}
        </button>;
    }

    return (
        <div className="w-5/6 mx-auto">
            <div className="w-full">
                <p className="text-xl text-center text-secondary font-semibold">Поиск аниме</p>
            </div>
            <div className="flex items-center space-x-10 mt-10">
                <div className="w-full mx-auto flex space-x-3">
                    <div className="input-group">
                        <input type="text"
                               placeholder="Поиск..."
                               ref={queryInput}
                               className="input input-bordered border-purple-400 w-full"/>
                        <button
                            type="button"
                            className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"
                            onClick={() => resetQuery()}>
                            <TrashIcon className="h-6 w-6"/>
                        </button>
                    </div>
                    <button
                        className="btn btn-secondary hover:bg-purple-600 hover:border-purple-600"
                        onClick={() => searchAnime()}>Найти</button>
                </div>
            </div>
            <div className="flex justify-center space-x-5 mt-10">
                <FilterPanel onOrderChanged={filterItems}/>
            </div>
            <div className='w-full mt-10'>
                <div className="w-full">
                    {loading ?
                        <div className="mx-auto w-fit pb-16">
                            <Loader color={"#C084FC"} size={30} speedMultiplier={1} />
                        </div>
                        :
                        <div className="mx-auto w-full grid grid-cols-3 gap-x-3 gap-y-5 pb-16">
                            {
                                animeList.length > 0 && animeList.map(anime =>
                                    <AnimeCard key={"anime_card_" + anime.mal_id}
                                               item={anime}
                                               viewed={userViewedList.includes(anime.mal_id)}
                                               saved={userSavedList.includes(anime.mal_id)}
                                               onAnimeStateChanged={(animeId, list) => updateUserAnimeList(animeId, list)}/>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Pagination
                    current={page}
                    onChange={changePage}
                    pageSize={25}
                    className="flex space-x-7 pb-16"
                    total={lastVisiblePage * 25}
                    locale={localeInfo}
                    itemRender={itemRender}/>
            </div>
        </div>
    );
};

export default observer(MainPage);
