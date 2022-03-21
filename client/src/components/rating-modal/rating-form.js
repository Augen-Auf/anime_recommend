import React, {Fragment, useEffect, useState} from 'react';

const RatingForm = ({rating = 0, anime, onChangeRating}) => {

    const [ratingNumber, setRatingNumber] = useState(0)

    useEffect(() => {
        setRatingNumber(rating)
    }, [rating])

    const changeRating = (method) => {
        method !== 'delete' ?
            rating !== ratingNumber && onChangeRating(ratingNumber, false) :
            rating > 0 && onChangeRating(ratingNumber, true)
    }

    const setColor = (number, positiveColor, negativeColor, neutralColor) => {
        if(number > rating && number <= ratingNumber)
        {
            return positiveColor
        }
        if (number < rating && number >= ratingNumber)
        {
            return negativeColor
        }
        return neutralColor
    }


    return (
        <Fragment>
            <p className="text-center text-gray-900 font-semibold">{anime}</p>
            <div className="flex space-x-2 bg-white p-3 rounded-lg mt-4">
                {
                    [1,2,3,4,5,6,7,8,9,10].map(number =>
                        <div
                            className={`w-8 h-8 flex justify-center items-center hover:bg-secondary
                            rounded-full border border-secondary text-gray-900 
                            ${ number === rating ?
                                'bg-secondary' : setColor(number, 'bg-green-400', 'bg-red-400', 'bg-white')}`}
                            onClick={() => setRatingNumber(number)}>
                            <span>{ number }</span>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                {
                    rating > 0 &&
                    <button
                        className="btn text-white hover:outline-none border-0 bg-gray-700 hover:bg-gray-800 flex-grow"
                        onClick={() => rating === ratingNumber ? changeRating('delete') : setRatingNumber(rating)}>
                        {rating !== ratingNumber ? 'Очистить' : 'Удалить'}
                    </button>
                }
                <button
                    className="btn text-white hover:outline-none border-0 bg-gray-700 hover:bg-gray-800 flex-grow"
                    onClick={() => changeRating()}>Подтвердить</button>
            </div>
        </Fragment>
    );
};

export default RatingForm;