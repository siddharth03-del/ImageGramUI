import { HeartIcon } from "@heroicons/react/16/solid";
import {ChatBubbleLeftIcon} from "@heroicons/react/16/solid";
import { fetchLikeOnPost } from "../Services/fetchLikeOnPost";
import { useState , useEffect} from "react";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import { isPostLiked } from "../Services/isPostLiked";
import { createPostLike } from "../Services/createPostLike";
import Comment from "../Comment/comment";
import { MyContext } from "../context";
import { useQuery } from "react-query";
function Interact({post_id}){
    const [countLike, setcountLike] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const {data : like} = useQuery(["liked", post_id], 
        () => isPostLiked(post_id),
        {
            cacheTime : 1000*60*30,
            staleTime : 1000*60*30
        }
    )
    const {data : countlike} = useQuery(["countlikes", post_id], 
        () => fetchLikeOnPost(post_id),
        {
            cacheTime : 1000*60*30,
            staleTime : 1000*60*30
        }
    )
    useEffect(()=>{
        setLiked(like);
    }, [like])
    useEffect(()=>{
        setcountLike(countlike);
        console.log(countlike);
    },[countlike]);
    function handlePostLike(){
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        setLiked(liked + 1);
        setcountLike(countLike + 1);
        createPostLike(token, post_id);
    }
    return(
        <MyContext.Provider>
            <div className="flex w-full mb-5">
                <div className="flex ">
                    {liked?
                    <HeartIcon className="w-8 h-8"/>
                    :
                    <HeartIcon className="w-8 h-8 cursor-pointer" style={{ fill: "none", stroke: "currentColor" }} onClick={handlePostLike}/>}
                    <p className="text-xl text-gray-600 ml-2 mr-2">{countLike}</p>
                </div>
                <div>
                    <ChatBubbleLeftIcon className="w-8 h-8 cursor-pointer" style={{ fill: "none", stroke: "currentColor" }} onClick={()=>{setShowComments(!showComments)}}/>
                        {showComments ? <Comment content_id={post_id}/> : null}
                </div>
            </div>
        </MyContext.Provider>
    )
}
export default Interact;