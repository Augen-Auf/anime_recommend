import React, {Fragment, useContext, useState} from 'react';
import AuthModal from "../auth-modal";
import AvatarLabel from "../avatar-label";
import {MAIN_PAGE} from "../../utils/consts";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const {store} = useAuth()

    function openModal(isOpenLoginForm) {
        setIsLogin(isOpenLoginForm)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
            <div className="flex-1 hidden px-2 mx-2 lg:flex">
                <Link to={MAIN_PAGE}
                      className="text-lg font-bold text-purple-400 hover:text-purple-600 transition-colors duration-150">
                    Anime Recommendation
                </Link>
            </div>

            {
                store.isAuth ?
                    <div className="px-5">
                    <AvatarLabel/>
                    </div>
                    :
                    <div className="flex-none hidden px-2 mx-2 lg:flex">
                        <div className="flex items-stretch">
                            <button className="btn  btn-ghost" onClick={() => openModal(true)}>
                                Войти
                            </button>
                            <button className="btn btn-ghost" onClick={() => openModal(false)}>
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
            }
            <AuthModal isOpen={isOpen} isLogin={isLogin} closeModal={closeModal}/>
        </div>);
};

export default observer(Navbar);
