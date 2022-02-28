import React, {useState} from 'react';
import AnimeCard from "../anime-card";

const MainPage = () => {
    const { pageYOffset } = window;
    const [visible, setVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const openSpeedDial = (itemId) => {
        setSelectedItem(itemId)
        setVisible(true)
    }


    return (
        <div className="px-12 mx-auto">
            <div className="flex items-center space-x-10">
                <span className="text-right text-purple-400 text-2xl font-semibold w-1/5">Поиск аниме:</span>
                <div className="flex space-x-4 w-4/5">
                    <input type="text" className="input bg-white flex-grow text-purple-400 text-xl"/>
                    <button className="btn">Найти</button>
                </div>
            </div>
            <div className='w-full mt-10 flex space-x-10'>
                <ul className="sticky top-10 menu w-1/5 h-min p-3 border bg-base-100 rounded-box border-purple-400">
                    <li className="text-purple-400 font-bold">
                        <span>
                            Фильтр
                        </span>
                    </li>
                    <li>
                        <a>
                            Сначала самое популярное
                        </a>
                    </li>
                    <li>
                        <a>
                            Сначала новинки
                        </a>
                    </li>
                    <li>
                        <a>
                            Сначала с высоким рейтингом
                        </a>
                    </li>
                </ul>
                <div className="w-4/5 grid grid-cols-2 gap-10">
                    {
                        [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(item =>
                            <AnimeCard key={"anime_card_" + item}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default MainPage;
