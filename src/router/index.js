import {
    createBrowserRouter,
    createRoutesFromElements,
    BrowserRouter,
    Route,
    Routes,
    RouterProvider,
    Navigate
} from "react-router-dom";
import Login from "../views/Login/Login";
import SandBOx from '../views/SandBox/NewsSandBox'
import UserList from "../views/SandBox/user-manage/UserList";
import RoleList from "../views/SandBox/right-manage/RoleList";
import RightList from "../views/SandBox/right-manage/RightList";
import Home from "../views/SandBox/home/Home";
import Nopermission from "../views/SandBox/nopermission/Nopermission";
import NewsList from "../views/SandBox/news-manage/NewsList";
import TikuUpload from '../views/OtherCom/TikuUpload'
export function FiveTagrouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}/> {/* 👈 Renders at /app/ */}
                <Route path="/sandbox" element={<SandBOx/>}>
                        <Route path="/sandbox/home" element={<Home/>} />
                        <Route path="/sandbox/user-manage/list" element={<UserList/>} />
                        <Route path="/sandbox/right-manage/role/list" element={<RoleList/>} />
                        <Route path="/sandbox/right-manage/right/list" element={<RightList/>} />
                        <Route path="/sandbox/news-manage/list" element={<NewsList/>} ></Route>
                        {/* Redirect */}
                        <Route path="" element={<Navigate to='/sandbox/home'/>} />
                        <Route path="*" element={<Nopermission/>} />
                </Route>
                <Route path="/login" element={<Login></Login>}/>
                <Route path="/tikuupload" element={<TikuUpload/>}/>
            </Routes>
        </BrowserRouter>
    );
}