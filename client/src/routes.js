import {MAIN_PAGE, PROFILE} from "./utils/consts";
import MainPage from "./components/main-page";
import ProfilePage from "./components/profile-page";

export const authRoutes = [
    {
        path: PROFILE,
        Component: ProfilePage
    }
]

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: MainPage
    }
]
