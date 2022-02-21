import React, {Fragment, useState} from 'react';
import AuthModal from "../auth-modal";

const isLoginUser = false

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

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
                <span className="text-lg font-bold text-purple-400">Anime Recommendation</span>
            </div>

            {
                isLoginUser ?
                    <div className="flex-none">
                        <div className="avatar">
                            <div className="rounded-full w-10 h-10 m-1">
                                <img src="https://i.pravatar.cc/500?img=32"/>
                            </div>
                        </div>
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

export default Navbar;
