import React, {Fragment, useState} from 'react';
import {useAuth} from "../../contexts/AuthContext";

const RegistrationForm = ({closeModal}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const {store} = useAuth()

    const registerUser = () => {
        store.registration(email, password, username)
        closeModal()
    }
    return (
        <Fragment>
            <p className="text-gray-700 text-center text-3xl font-semibold">Зарегистрироваться</p>
            <div>
                <div className="form-control ">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Почта</span>
                    </label>
                    <input type="text"
                           placeholder="post@example.ru"
                           onChange={(e) => setEmail(e.target.value)}
                           className="input input-bordered bg-white text-purple-600"/>
                </div>
                <div className="form-control text-gray-700">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Имя пользователя</span>
                    </label>
                    <input type="text"
                           placeholder="Имя пользователя"
                           onChange={(e) => setUsername(e.target.value)}
                           className="input input-bordered bg-white text-purple-600"/>
                </div>
                <div className="form-control text-gray-700">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Пароль</span>
                    </label>
                    <input type="password"
                           placeholder="Пароль"
                           onChange={(e) => setPassword(e.target.value)}
                           className="input input-bordered bg-white text-purple-600"/>
                </div>
                <button
                    className="btn text-white hover:outline-none border-0 bg-gray-700 hover:bg-gray-800 w-full mt-6"
                    onClick={registerUser}>
                    Зарегистрироваться
                </button>
            </div>
        </Fragment>
    );
};

export default RegistrationForm;
