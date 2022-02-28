import React, {Fragment, useContext, useState} from 'react';
import {useAuth} from "../../contexts/AuthContext";

const LoginForm = ({closeModal}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useAuth()

    const loginUser = () => {
        store.login(email, password)
        closeModal()
    }
    return (
        <Fragment>
            <p className="text-gray-700 text-center text-3xl font-semibold">Войти</p>
            <div >
                <div className="form-control ">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Почта</span>
                    </label>
                    <input
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="post@example.ru"
                        className="input input-bordered bg-white text-purple-600"/>
                </div>
                <div className="form-control text-gray-700">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Пароль</span>
                    </label>
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Пароль"
                        className="input input-bordered bg-white text-purple-600"/>
                </div>
                <button className="btn bg-gray-700 w-full mt-6" onClick={loginUser}>Войти</button>
            </div>
        </Fragment>
    );
};

export default LoginForm;
