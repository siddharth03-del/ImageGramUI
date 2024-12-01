import { useState } from "react";
import { createComment } from "../Services/createComment";
import { MyContext } from "../context";
import { useContext } from "react";
function CreateComment(){
    const {comment, setComment,  commentType, setCommentType, rerender, setrender, createCommentId, setCreateCommentId, postId} = useContext(MyContext);
    async function handlePost(){
        console.log(comment);
        console.log(commentType);
        console.log(createCommentId);
        await createComment({createCommentId, commentType, text : comment});
        setCommentType("post");
        setrender(!rerender);
        setComment('');
        setCreateCommentId(postId);
    }
    return(
        <div className="flex mt-2 mb-2">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
            <button className="btn btn-primary ml-4" onClick={handlePost}>Post</button>
        </div>
    )
}
export default CreateComment;