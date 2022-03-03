import React, {useContext} from 'react';
import {LogoutIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {MAIN_PAGE, PROFILE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";


const AvatarLabel = () => {
    const {store} = useAuth()
    const navigate = useNavigate()

    const logoutUser = () => {
        store.logout()
        navigate(MAIN_PAGE)
    }
    return (
        <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
                <div className="avatar">
                    <div className="mask mask-circle bg-purple-400 h-12 w-12 bg-opacity-10">
                        <img
                            src={store.user?.avatar && process.env.REACT_APP_API_URL + '/avatar/' + store.user?.avatar}
                            className="mask mask-circle bg-purple-400"/>
                    </div>
                </div>
                <Link to={PROFILE} className="text-purple-400 font-semibold leading-none mb-1 hover:text-purple-600 transition-colors duration-150">
                    {store.user?.username}
                </Link>
            </div>
            <button
                className="btn text-purple-400 hover:bg-purple-400 btn-square hover:text-gray-900 transition-colors duration-150 p-px"
                onClick={logoutUser}>
                <LogoutIcon className="h-7 w-7"/>
            </button>
        </div>
    );
};

export default observer(AvatarLabel);