import React, {useState} from 'react';
import { EyeIcon, BookmarkIcon } from '@heroicons/react/solid'

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

export default MainPage;
