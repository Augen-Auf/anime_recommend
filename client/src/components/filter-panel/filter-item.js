import React, {useEffect, useState} from 'react';
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/solid";

const FilterItem = ({currentOrder, index, title, onSortChanged}) => {
    const [sort, setSort] = useState(0)
    const sortVariants = [null, 'asc', 'desc']

    const changeSort = () => {
        const newSort = (sort + 1) % 3
        setSort(newSort)
        onSortChanged(sortVariants[newSort])
    }

    useEffect(() => {
        if(currentOrder !== index)
        {
            setSort(0)
        }
    }, [currentOrder])

    return (
        <div
            className={`${sort > 0 ? 'bg-secondary' : ''}
                            w-48 text-white hover:bg-secondary px-3 py-2 
                            rounded-xl transition-colors duration-150 flex justify-center space-x-2`}
            onClick={changeSort}>
            <span>{title}</span>
            {
                sort === 1 && <ArrowDownIcon className="h-6 w-6"/>
            }
            {
                sort === 2 && <ArrowUpIcon className="h-6 w-6"/>
            }
        </div>
    );
};

export default FilterItem;