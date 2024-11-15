import { useState } from "react";
import { createComment } from "../Services/createComment";
function CreateComment({content_id, type, rerender, setrender}){
    const [comment, setComment] = useState('');
    async function handlePost(){
        await createComment({content_id, type, text : comment});
        setrender(!rerender);
        setComment('');
    }
    return(
        <div className="flex mt-2 mb-2">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
            <button className="btn btn-primary ml-4" onClick={handlePost}>Post</button>
        </div>
    )
}
export default CreateComment;