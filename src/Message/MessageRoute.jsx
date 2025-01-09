import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import Chatting from "./chatting";
import Suggestion from "./Suggestion";
import Layout from "./Layout";
import ChatWithAI from "./chatWithAI";
import Feedback from "./feedback";
function MessageRoute(){
    return(
        <div className="flex flex-row w-full">
        <Users/>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Suggestion/>}/>
                <Route path="/t/:userId" element={<Chatting/>}/>
                <Route path="/t/chatwithai" element={<ChatWithAI/>}/>
                <Route path="/t/feedback" element={<Feedback/>}/>
            </Route>
        </Routes>
        </div>

    )
}
export default MessageRoute;