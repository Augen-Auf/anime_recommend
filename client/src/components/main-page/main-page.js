import React, {useState} from 'react';

const MainPage = () => {
    const { pageYOffset } = window;
    const [visible, setVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const openSpeedDial = (itemId) => {
        setSelectedItem(itemId)
        setVisible(true)
    }


    return (
        <div className="container mx-auto">
            <div className="w-3/4 flex space-x-4 mx-auto">
                <input type="text" className="input bg-white flex-grow text-purple-400 text-xl"/>
                <button className="btn">Найти</button>
            </div>
            <div className='w-full mt-10 flex space-x-10'>
                <ul className="sticky top-10 menu w-64 h-min p-3 border bg-base-100 rounded-box border-purple-400">
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
                <div className="flex-grow grid grid-cols-2 gap-16">
                    {
                        [1,2,3,4,5,6,7,8,9].map(item =>
                            <div className="card card-side bg-base-100 shadow-xl">
                                <figure><img src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie"/></figure>
                                <div className="card-body bg-white text-gray-900">
                                    <h2 className="card-title">New movie is released!</h2>
                                    <p>Click the button to watch on Jetflix app.</p>
                                    <div className="justify-end card-actions">
                                        <button className="btn btn-primary">Watch</button>
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
