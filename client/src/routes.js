import {MAIN_PAGE, PROFILE} from "./utils/consts";
import MainPage from "./components/main-page";
import Profile from "./components/profile";

export const authRoutes = [
    {
        path: PROFILE,
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: MainPage
    }
]
