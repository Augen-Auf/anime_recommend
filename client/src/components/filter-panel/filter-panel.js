import React, {useState} from 'react';
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/solid";
import FilterItem from "./filter-item";

const FilterPanel = ({onOrderChanged}) => {

    const [order, setOrder] = useState({})

    const orderVariants = [
        {
            title: 'По популярности',
            orderBy: 'favorites'
        },
        {
            title: 'По рейтингу',
            orderBy: 'score'
        },
        {
            title: 'По дате выхода',
            orderBy: 'end_date'
        },
    ]

    const changeOrderSort = (variant, sortType) => {
        setOrder({order: variant, sort: sortType})
        onOrderChanged(sortType === null ? null : {order: orderVariants[variant].orderBy, sort: sortType})
    }

    return (
        <div className="w-full flex justify-center space-x-5">
            {
                orderVariants.map((item, variantIndex) =>
                    <FilterItem
                        title={item.title}
                        index={variantIndex}
                        currentOrder={order.order}
                        onSortChanged={(sortType) => changeOrderSort(variantIndex, sortType)}/>
                )
            }
        </div>
    );
};

export default FilterPanel;