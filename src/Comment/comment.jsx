import { useState , useEffect} from "react";
import { showComments } from "../Services/showComments";
import CommentStructure from "./commentStructure";
import CreateComment from "./createComment";
function Comment({content_id, type}){
    const [comments, setComments] = useState(null);
    const [rerender, setrender] = useState(false);
    useEffect(()=>{
        async function showCommentsHelper(content_id, type){
            const response = await showComments(content_id, type);
            console.log(content_id);
            console.log(response);
            setComments(response);
        }
        showCommentsHelper(content_id, type);
    },[rerender]);
    return(
        <div className="w-full h-full">
            <CreateComment content_id={content_id} type={type} rerender={rerender} setrender={setrender}/>
            <div>
                {comments && comments.map((element, index)=>{
                    return(
                        <div key={index}>
                            <CommentStructure comment_id={element._id}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Comment;