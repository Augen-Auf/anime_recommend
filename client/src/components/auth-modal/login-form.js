import React, {Fragment} from 'react';

const LoginForm = () => {
    return (
        <Fragment>
            <p className="text-gray-700 text-center text-3xl font-semibold">Войти</p>
            <form >
                <div className="form-control ">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Почта</span>
                    </label>
                    <input type="text" placeholder="post@example.ru" className="input input-bordered bg-white"/>
                </div>
                <div className="form-control text-gray-700">
                    <label className="label">
                        <span className="text-gray-700 font-semibold">Пароль</span>
                    </label>
                    <input type="text" placeholder="Пароль" className="input input-bordered bg-white"/>
                </div>
                <button className="btn bg-gray-700 w-full mt-6">Войти</button>
            </form>
        </Fragment>
    );
};

export default LoginForm;
