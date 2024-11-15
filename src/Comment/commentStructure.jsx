import { useEffect, useState } from "react";
import Comment from "./comment";
import Replies from "./showReplies";
import { fetchComment } from "../Services/fetchComment";
function CommentStructure({comment_id}){
    const [showMore, setShowMore] = useState(false);
    const [comment, setComment] = useState(null);
    useEffect(()=>{
        async function fetchCommentHelper(){
            const temp = await fetchComment(comment_id);
            console.log(temp);
            setComment(temp);
        }
        fetchCommentHelper();
    },[]);
    return(
        <div>
            {comment ? <div className="w-full h-fit">
            <div>
                <h1 className="font-bold">{comment.username}</h1>
            </div>
            <div>
                <h1 className="ml-2">{comment.text}</h1>
            </div>
            {comment.replies.length > 0 ? 
            <div className="ml-2">
                <h1 onClick={()=>{setShowMore(!showMore)}} className="cursor-pointer">Show replies</h1>
                {showMore && <Replies replies={comment.replies}/>}
            </div>
            : null
        }
        </div> : null}
        </div>
    )
}
export default CommentStructure;