import axios from "axios"
const CancelToken = axios.CancelToken;

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

const requestInterceptor = config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$api.interceptors.request.use(requestInterceptor)

$api.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        if(axios.isCancel(error))
        {
            console.log('Request canceled', error.message);
            return {data: []}
        }
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get(
                    process.env.REACT_APP_API_URL + '/refresh',
                    {withCredentials: true}
                )
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log('Пользователь неавторизован')
            }
        }
        throw error
    })

export {
    $api,
    CancelToken
}
