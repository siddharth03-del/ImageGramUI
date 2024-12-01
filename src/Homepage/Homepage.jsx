import { DefaultSidebar } from "../Navigation/sideNavigation";
import { Posts } from "../Posts/Posts";
import {Upload} from "../Upload/Upload";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Explorer from "../Explore/explore";
import ExploreProfile from "../Profile/exploreProfile";
import PostExpand from "../Posts/postExpand";
import { useLocation } from "react-router-dom";
function Homepage(){
    const location = useLocation();
    const state = location.state;
    return (
        <div className="w-full h-full flex relative">
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<DefaultSidebar/>}>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/upload" element={<Upload/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/explore" element={<Explorer/>}/>
                    <Route path="/explore/:username" element={<ExploreProfile/>} />
                    <Route path="/post/:postId" element={<PostExpand/>} />
                </Route>
            </Routes>
            {
                state?.backgroundLocation && (
                    <Routes>
                        <Route path="/post/:postId" element={<PostExpand/>} />
                    </Routes>
                )
            }
        </div>
    )
}

export default Homepage;