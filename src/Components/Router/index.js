import StartPage from "../Pages/StartPage/StartPage";
import Login from "../Pages/Login/Login";
import Messages from "../Pages/Messages/Messages";
import Profile from "../Pages/Profile/Profile";
import Register from "../Pages/Register/Register";
import Friends from "../Friends/Friends";

export const publicRoutes = [
    {path: '/', component: StartPage, exact: true},
    {path: '/login', component: Login, exact: true},
    {path: '/register', component: Register, exact: true},
]
export const privateRoutes = [
    {path: '/', component: StartPage, exact: true},
    {path: '/messages/:id', component: Messages, exact: true},
    {path: '/login', component: Login, exact: true},
    {path: '/messages', component:Messages, exact: true},
    {path: '/profile', component:Profile, exact: true},
    {path: '/friends', component:Friends, exact: true},
]
