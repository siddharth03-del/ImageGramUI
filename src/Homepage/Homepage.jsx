import { DefaultSidebar } from "../Navigation/sideNavigation";
import { Posts } from "../Posts/Posts";
import {Upload} from "../Upload/Upload";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Explorer from "../Explore/explore";
function Homepage(){
    return (
        <div className="w-full h-full flex relative">
            <Routes>
                <Route path="/" element={<DefaultSidebar/>}>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/upload" element={<Upload/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/explore" element={<Explorer/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default Homepage;