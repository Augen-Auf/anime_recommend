import {MAIN_PAGE, PROFILE, RECOMMEND_PAGE, SETTINGS_PAGE} from "./utils/consts";
import MainPage from "./components/main-page";
import ProfilePage from "./components/profile-page";
import SettingsPage from "./components/settings-page";
import RecommendationPage from "./components/recommendation-page";

export const authRoutes = [
    {
        path: PROFILE,
        Component: ProfilePage
    },
    {
        path: SETTINGS_PAGE,
        Component: SettingsPage
    },
    {
        path: RECOMMEND_PAGE,
        Component: RecommendationPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: MainPage
    }
]
