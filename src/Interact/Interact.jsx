import { HeartIcon } from "@heroicons/react/16/solid";
import {ChatBubbleLeftIcon} from "@heroicons/react/16/solid";
import { fetchLikeOnPost } from "../Services/fetchLikeOnPost";
import { useState , useEffect} from "react";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import { isPostLiked } from "../Services/isPostLiked";
import { createPostLike } from "../Services/createPostLike";
import Comment from "../Comment/comment";
function Interact({post_id}){
    const [countLike, setcountLike] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    useEffect(()=>{
        async function countLikeOnPostHelper(token){
            console.log(post_id);
            const likeCount = await fetchLikeOnPost(token, post_id);
            console.log(likeCount);
            setcountLike(likeCount);
        }
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        console.log(token);
        countLikeOnPostHelper(token);
    },[])
    useEffect(()=>{
        async function isLikedPostHelper(token){
            const isLiked = await isPostLiked(token, post_id);
            setLiked(isLiked);
        }
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        isLikedPostHelper(token);
    })
    function handlePostLike(){
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        setLiked(liked + 1);
        setcountLike(countLike + 1);
        createPostLike(token, post_id);
    }
    return(
        <div className="flex w-full">
            <div className="flex ">
                {liked?
                <HeartIcon className="w-8 h-8"/>
                :
                <HeartIcon className="w-8 h-8 cursor-pointer" style={{ fill: "none", stroke: "currentColor" }} onClick={handlePostLike}/>}
                <p className="text-xl text-gray-600 ml-2 mr-2">{countLike}</p>
            </div>
            <div>
                <ChatBubbleLeftIcon className="w-8 h-8 cursor-pointer" style={{ fill: "none", stroke: "currentColor" }} onClick={()=>{setShowComments(!showComments)}}/>
                    {showComments ? <Comment content_id={post_id} type={"post"}/> : null}
            </div>
        </div>
    )
}
export default Interact;