import { DefaultSidebar } from "../Navigation/sideNavigation";
import { Posts } from "../Posts/Posts";
import {Upload} from "../Upload/Upload";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Explorer from "../Explore/explore";
import ExploreProfile from "../Profile/exploreProfile";
import PostExpand from "../Posts/postExpand";
import { useLocation } from "react-router-dom";
import Settings from "../Settings/settings";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Message from "../Message/MessageRoute";
import MessageRoute from "../Message/MessageRoute";
function Homepage(){
    const location = useLocation();
    const state = location.state;
    return (
        <div className="w-full h-full flex relative">
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<DefaultSidebar/>}>
                    <Route path="/posts" element={<ProtectedRoute><Posts/></ProtectedRoute>}/>
                    <Route path="/upload" element={<ProtectedRoute><Upload/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/explore" element={<ProtectedRoute><Explorer/></ProtectedRoute>}/>
                    <Route path="/explore/:username" element={<ProtectedRoute><ExploreProfile/></ProtectedRoute>} />
                    <Route path="/post/:postId" element={<ProtectedRoute><PostExpand/></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
                    <Route path="/message/*" element={<ProtectedRoute><MessageRoute/></ProtectedRoute>}/>
                </Route>
            </Routes>
            {
                state?.backgroundLocation && (
                    <Routes>
                        <Route path="/post/:postId" element={<ProtectedRoute><PostExpand/></ProtectedRoute>} />
                    </Routes>
                )
            }
        </div>
    )
}

export default Homepage;