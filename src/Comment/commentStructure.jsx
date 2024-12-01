import { useEffect, useState } from "react";
import Replies from "./showReplies";
import { fetchComment } from "../Services/fetchComment";
import { MyContext } from "../context";
import { useContext } from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { isCommentLiked } from "../Services/isCommentLiked";
import { createCommentLike } from "../Services/createCommentLike";
import { useQuery } from "react-query";
function CommentStructure({comment_id}){
    const [showMore, setShowMore] = useState(false);
    const [comments, setComments] = useState(null);
    const {setCommentType, setComment, setCreateCommentId, rerender, setrender} = useContext(MyContext);
    const [liked, setLiked] = useState(false);
    // useEffect(()=>{
    //     async function fetchCommentHelper(){
    //         const temp = await fetchComment(comment_id);
    //         console.log(temp);
    //         setComments(temp);
    //     }
    //     fetchCommentHelper();
    // },[rerender]);
    // useEffect(()=>{
    //     async function getCommentLikeHelper(){
    //         const response = await isCommentLiked(comment_id);
    //         setLiked(response);
    //     }
    //     getCommentLikeHelper();
    // },[rerender]);
    useQuery(["showcomment", comment_id, rerender], async()=>{
        const temp = await fetchComment(comment_id);
        console.log(temp);
        setComments(temp);
        const response = await isCommentLiked(comment_id);
        setLiked(response);
        return;
    }, {
        cacheTime : 1000*60*10
    })
    function replyHandler(){
        setCommentType("comment");
        setComment(`@${comments.user.username} `);
        setCreateCommentId(comment_id);
    }
    function handleCommentLike(){
        async function likeCommentHelper(){
            const response = await createCommentLike(comment_id);
            setrender(!rerender);
            console.log(response);
            setLiked(true);
        }
        likeCommentHelper();
    }
    return(
        <div>
            {comments ? <div className="w-full h-fit">
            <div>
                <h1 className="font-bold">{comments.user.username}</h1>
            </div>
            <div className="flex flex-row w-64 justify-between">
                <h1 className="ml-2">{comments.text}</h1>
                <div className="flex flex-row">
                    {liked?
                    <HeartIcon className="w-4 h-4 ml-20"/>
                    :
                    <HeartIcon className="w-4 h-4 cursor-pointer ml-20" style={{ fill: "none", stroke: "currentColor" }} onClick={handleCommentLike}/>}
                </div>
            </div>
            <div className="flex flex-row hover:cursor-pointer">
                <h1 className="text-xs text-gray-700 hover:text-gray-900" onClick={()=>{replyHandler()}}>Reply</h1>
                <h1 className="text-xs text-gray-700 ml-2">{comments.likes} Likes</h1>
            </div>
            {comments.replies.length > 0 ? 
            <div className="ml-2">
                <h1 onClick={()=>{setShowMore(!showMore)}} className="cursor-pointer text-xs text-gray-600 hover:text-gray-800"> -Show replies</h1>
                {showMore && <Replies replies={comments.replies}/>}
            </div>
            : null
        }
        </div> : null}
        </div>
    )
}
export default CommentStructure;