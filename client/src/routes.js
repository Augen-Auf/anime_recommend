import {MAIN_PAGE, PROFILE, SETTINGS_PAGE} from "./utils/consts";
import MainPage from "./components/main-page";
import ProfilePage from "./components/profile-page";
import SettingsPage from "./components/settings-page";

export const authRoutes = [
    {
        path: PROFILE,
        Component: ProfilePage
    },
    {
        path: SETTINGS_PAGE,
        Component: SettingsPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: MainPage
    }
]
